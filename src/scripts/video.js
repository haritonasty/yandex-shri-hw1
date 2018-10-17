const server = `192.168.31.46`; //поменяйте это поле в соответсвии с внешним урлом на хосте, где запускаются видео

const setOfCameras = [];
const button = document.querySelector('.camera-button');
const brightness = document.querySelector('.brightness');
const contrast = document.querySelector('.contrast');
const initializer = document.querySelector('.help-initializer');
const vol = document.querySelector('.volume_active');
const settings = document.querySelector('.settings');


class Camera {
    constructor(video, canvas) {
        this.video = video;
        this.canvas = canvas;
        this.filters = {
            brightness: 100,
            contrast: 100
        };
        this.cameraVolume = null;
        this.fullscreen = false;

        let context = new AudioContext();
        let source = context.createMediaElementSource(this.video);
        let analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.9;
        analyser.fftSize = 32;
        source.connect(analyser);
        analyser.connect(context.destination);
        this.cameraVolume = {
            context: context,
            source: source,
            analyser: analyser
        };
    }

    toggleFullscreen() {
        this.canvas.classList.toggle('fullscreen');
        this.video.muted = !this.video.muted;
        this.fullscreen = !this.fullscreen;
        button.classList.toggle('camera-button_hidden');
        settings.classList.toggle('settings-hidden');
    }

}


function initVideo(video, canvas, url) {
    let camera;
    let ctx;

    if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play()
                .then(goPlay)
                .catch(tryPlay);
        })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            video.play()
                .then(goPlay)
                .catch(tryPlay);
        });
    }

    const goPlay = () => {
        if (!video.paused) {
            video.classList.add('visually-hidden');
            initializer.classList.add('hidden');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx = canvas.getContext('2d');
            camera = new Camera(video, canvas);
            setOfCameras.push(camera);
            camera.canvas.addEventListener('click', canvasChecker);
            loop();
        }
    };

    const tryPlay = () => {
        initializer.classList.remove('hidden');
        initVideo(video, canvas, url);
    };

    const loop = () => {
        if (camera.fullscreen) {
            ctx.filter = `brightness(${camera.filters.brightness}%) contrast(${camera.filters.contrast}%)`;
        }
        ctx.drawImage(camera.video, 0, 0, camera.canvas.width, camera.canvas.height);
        requestAnimationFrame(loop);
    };
}

const canvasChecker = (e) => {
    const activeCamera = setOfCameras.find(item => item.fullscreen === true);
    if (activeCamera) {
        activeCamera.toggleFullscreen();
        activeCamera.canvas.style.zIndex = '1';
        if (activeCamera.canvas === e.target) return;
    }
    let currentCamera = setOfCameras.find(item => item.canvas === e.target);
    currentCamera.canvas.style.zIndex = '5';
    currentCamera.toggleFullscreen();
    brightness.value = currentCamera.filters.brightness;
    contrast.value = currentCamera.filters.contrast;
    currentCamera.cameraVolume.context.resume().then(() => {
        equalize(currentCamera);
    });
};


const applyFilter = (type, value) => {
    const activeCamera = setOfCameras.find(item => item.fullscreen === true);

    if (activeCamera) {
        if (type === 'brightness') {
            activeCamera.filters.brightness = value;
        }

        if (type === 'contrast') {
            activeCamera.filters.contrast = value;
        }
    }
};


const returnFromFullscreen = () => {
    const activeCamera = setOfCameras.find(item => item.fullscreen === true);
    if (activeCamera) {
        activeCamera.toggleFullscreen();
        activeCamera.canvas.style.zIndex = '1';
    }
    button.classList.add('camera-button_hidden');
};


function equalize(camera) {

    function draw() {
        let array = new Uint8Array(camera.cameraVolume.analyser.fftSize);
        camera.cameraVolume.analyser.getByteTimeDomainData(array);

        let average = 0;
        for (let i = 0; i < array.length; i++) {
            average += Math.abs(array[i] - 128);
        }
        average /= array.length;
        vol.style.width = `${average * 1000 / 200}%`;

        if (camera.fullscreen) {
            requestAnimationFrame(draw);
        }
    }

    draw();
}


initVideo(
    document.querySelector(`.video-1`),
    document.querySelector(`.canvas-1`),
    `http://${server}:9191/master?url=http%3A%2F%2F${server}%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8`
);
initVideo(
    document.querySelector(`.video-2`),
    document.querySelector(`.canvas-2`),
    `http://${server}:9191/master?url=http%3A%2F%2F${server}%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8`
);
initVideo(
    document.querySelector(`.video-3`),
    document.querySelector(`.canvas-3`),
    `http://${server}:9191/master?url=http%3A%2F%2F${server}%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8`
);
initVideo(
    document.querySelector(`.video-4`),
    document.querySelector(`.canvas-4`),
    `http://${server}:9191/master?url=http%3A%2F%2F${server}%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8`
);
