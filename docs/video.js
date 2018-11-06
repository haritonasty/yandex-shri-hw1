var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "hls.js"], function (require, exports, hls_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    hls_js_1 = __importDefault(hls_js_1);
    const setOfCameras = [];
    const button = document.querySelector('.camera-button');
    const brightness = document.querySelector('.brightness');
    const contrast = document.querySelector('.contrast');
    const initializer = document.querySelector('.help-initializer');
    const vol = document.querySelector('.volume_active');
    const settings = document.querySelector('.settings');
    const applyFilter = (type, value) => {
        const activeCamera = setOfCameras.find(item => item.fullscreen);
        if (activeCamera) {
            if (type === 'brightness') {
                activeCamera.filters.brightness = parseInt(value, 10);
            }
            if (type === 'contrast') {
                activeCamera.filters.contrast = parseInt(value, 10);
            }
        }
    };
    const returnFromFullscreen = () => {
        const activeCamera = setOfCameras.find(item => item.fullscreen);
        if (activeCamera) {
            activeCamera.toggleFullscreen();
            activeCamera.canvas.style.zIndex = '1';
        }
        if (button)
            button.classList.add('camera-button_hidden');
    };
    if (button) {
        button.addEventListener('click', returnFromFullscreen);
    }
    if (brightness) {
        brightness.addEventListener('input', (e) => {
            if (e.target) {
                applyFilter('brightness', e.target.value);
            }
        });
    }
    if (contrast) {
        contrast.addEventListener('input', (e) => {
            if (e.target) {
                applyFilter('contrast', e.target.value);
            }
        });
    }
    class Camera {
        constructor(video, canvas) {
            this.video = video;
            this.canvas = canvas;
            this.filters = { brightness: 100, contrast: 100 };
            this.cameraVolume = null;
            this.fullscreen = false;
            const context = new AudioContext();
            const source = context.createMediaElementSource(this.video);
            const analyser = context.createAnalyser();
            analyser.smoothingTimeConstant = 0.9;
            analyser.fftSize = 32;
            source.connect(analyser);
            analyser.connect(context.destination);
            this.cameraVolume = { context, source, analyser };
        }
        toggleFullscreen() {
            this.canvas.classList.toggle('fullscreen');
            this.video.muted = !this.video.muted;
            this.fullscreen = !this.fullscreen;
            if (button)
                button.classList.toggle('camera-button_hidden');
            if (settings)
                settings.classList.toggle('settings-hidden');
        }
    }
    const initVideo = (video, canvas, url) => {
        let camera;
        let ctx;
        if (video && canvas) {
            if (hls_js_1.default.isSupported()) {
                const hls = new hls_js_1.default();
                hls.loadSource(url);
                hls.attachMedia(video);
                hls.on(hls_js_1.default.Events.MANIFEST_PARSED, () => {
                    video.play()
                        .then(goPlay)
                        .catch(tryPlay);
                });
            }
            else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
                video.addEventListener('loadedmetadata', () => {
                    video.play()
                        .then(goPlay)
                        .catch(tryPlay);
                });
            }
        }
        const goPlay = () => {
            if (video && canvas) {
                if (!video.paused) {
                    video.classList.add('visually-hidden');
                    if (initializer)
                        initializer.classList.add('hidden');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx = canvas.getContext('2d');
                    camera = new Camera(video, canvas);
                    setOfCameras.push(camera);
                    camera.canvas.addEventListener('click', canvasChecker);
                    loop();
                }
            }
        };
        const tryPlay = () => {
            if (initializer)
                initializer.classList.remove('hidden');
            initVideo(video, canvas, url);
        };
        const loop = () => {
            if (ctx) {
                if (camera.fullscreen) {
                    ctx.filter =
                        `brightness(${camera.filters.brightness}%) contrast(${camera.filters.contrast}%)`;
                }
                ctx.drawImage(camera.video, 0, 0, camera.canvas.width, camera.canvas.height);
                requestAnimationFrame(loop);
            }
        };
    };
    const canvasChecker = (e) => {
        const activeCamera = setOfCameras.find((item) => item.fullscreen);
        if (activeCamera) {
            activeCamera.toggleFullscreen();
            activeCamera.canvas.style.zIndex = '1';
            if (activeCamera.canvas === e.target)
                return;
        }
        const currentCamera = setOfCameras
            .find((item) => item.canvas === e.target);
        if (currentCamera) {
            currentCamera.canvas.style.zIndex = '5';
            currentCamera.toggleFullscreen();
            if (brightness && contrast) {
                contrast.value = (currentCamera.filters.contrast).toString();
                brightness.value = (currentCamera.filters.brightness).toString();
            }
            if (currentCamera.cameraVolume) {
                currentCamera.cameraVolume.context.resume().then(() => {
                    equalize(currentCamera);
                });
            }
        }
    };
    function equalize(camera) {
        function draw() {
            if (camera.cameraVolume) {
                const array = new Uint8Array(camera.cameraVolume.analyser.fftSize);
                camera.cameraVolume.analyser.getByteTimeDomainData(array);
                let average = 0;
                for (let i = 0; i < array.length; i += 1) {
                    average += Math.abs(array[i] - 128);
                }
                average /= array.length;
                if (vol)
                    vol.style.width = `${average * 1000 / 200}%`;
            }
            if (camera.fullscreen) {
                requestAnimationFrame(draw);
            }
        }
        draw();
    }
    const urls = [
        'http://live-bumtv.cdnvideo.ru/bumtv-live/smil:bumtv.smil/chunklist_b4192000.m3u8',
        'http://highvolume03.streampartner.nl:1935/vleugels_hd4/livestream/playlist.m3u8',
        'http://193.124.177.175:8081/live-x/t2x2/playlist.m3u8',
        'http://hls-edge.cdn.buy-home.tv/bhtvlive/_definst_/live/playlist.m3u8',
    ];
    for (let i = 0; i < 4; i += 1) {
        initVideo(document.querySelector(`.video-${i + 1}`), document.querySelector(`.canvas-${i + 1}`), urls[i]);
    }
});
