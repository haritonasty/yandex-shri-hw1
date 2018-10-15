const detectHover = {
    update() {
        if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
            detectHover.hover = window.matchMedia('(hover: hover)').matches;
            detectHover.none = (
                window.matchMedia('(hover: none)').matches ||
                window.matchMedia('(hover: on-demand)').matches
            );
            detectHover.anyHover = window.matchMedia('(any-hover: hover)').matches;
            detectHover.anyNone = (
                window.matchMedia('(any-hover: none)').matches ||
                window.matchMedia('(any-hover: on-demand)').matches
            );
        }
    },
};

const detectPointer = {
    update() {
        if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
            detectPointer.fine = window.matchMedia('(pointer: fine)').matches;
            detectPointer.coarse = window.matchMedia('(pointer: coarse)').matches;
            detectPointer.none = window.matchMedia('(pointer: none)').matches;
            detectPointer.anyFine = window.matchMedia('(any-pointer: fine)').matches;
            detectPointer.anyCoarse = window.matchMedia('(any-pointer: coarse)').matches;
            detectPointer.anyNone = window.matchMedia('(any-pointer: none)').matches;
        }
    },
};


const detectTouchEvents = {
    update() {
        if (typeof window !== 'undefined') {
            detectTouchEvents.hasSupport = 'ontouchstart' in window;
            detectTouchEvents.browserSupportsApi = Boolean(window.TouchEvent);
        }
    },
};

const detectPassiveEvents = {
    update() {
        if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
            let passive = false;
            const options = Object.defineProperty({}, 'passive', {
                get() {
                    passive = true;
                },
            });
            const noop = () => {
            };
            window.addEventListener('testPassiveEventSupport', noop, options);
            window.removeEventListener('testPassiveEventSupport', noop, options);
            detectPassiveEvents.hasSupport = passive;
        }
    },
};

const detectIt = {
    state: {
        detectHover,
        detectPointer,
        detectTouchEvents,
        detectPassiveEvents,
    },
    update() {
        detectIt.state.detectHover.update();
        detectIt.state.detectPointer.update();
        detectIt.state.detectTouchEvents.update();
        detectIt.state.detectPassiveEvents.update();
        detectIt.updateOnlyOwnProperties();
    },
    updateOnlyOwnProperties() {
        if (typeof window !== 'undefined') {
            detectIt.passiveEvents = detectIt.state.detectPassiveEvents.hasSupport || false;

            detectIt.hasTouch = detectIt.state.detectTouchEvents.hasSupport || false;

            detectIt.deviceType = detectIt.hasTouch ? 'touchOnly' : 'mouseOnly';
            if (detectIt.hasTouch &&
                Object.keys(detectIt.state.detectHover).filter(key => key !== 'update').every(key => detectIt.state.detectHover[key] === false) &&
                Object.keys(detectIt.state.detectPointer).filter(key => key !== 'update').every(key => detectIt.state.detectPointer[key] === false)) {
                if (window.navigator && /android/.test(window.navigator.userAgent.toLowerCase())) detectIt.deviceType = 'touchOnly';
                detectIt.deviceType = 'hybrid';
            }
            if (detectIt.hasTouch && (detectIt.state.detectHover.anyHover || detectIt.state.detectPointer.anyFine)) detectIt.deviceType = 'hybrid';

            detectIt.hasMouse = detectIt.deviceType !== 'touchOnly';

            detectIt.primaryInput =
                (detectIt.deviceType === 'mouseOnly' && 'mouse') ||
                (detectIt.deviceType === 'touchOnly' && 'touch') ||
                (detectIt.state.detectPointer.fine && 'mouse') ||
                (detectIt.state.detectPointer.coarse && 'touch') ||
                'mouse';

            const inVersionRange = version => version >= 59 && version < 62;
            const isAffectedWindowsChromeVersion =
                /windows/.test(window.navigator.userAgent.toLowerCase()) &&
                /chrome/.test(window.navigator.userAgent.toLowerCase()) &&
                inVersionRange(parseInt(/Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1], 10));

            if (isAffectedWindowsChromeVersion && detectIt.hasTouch) {
                detectIt.deviceType = 'hybrid';
                detectIt.hasMouse = true;
                detectIt.primaryInput = 'mouse';
            }
        }
    },
};

detectIt.update();
if ((detectIt.deviceType === 'hybrid' || detectIt.deviceType === 'mouseOnly') && detectIt.hasMouse && detectIt.primaryInput === 'mouse') {
    document.body.classList.add('hasHover');
}
const menuNavOpen = document.querySelector('.button-burger');
const menuNavClose = document.querySelector('.button-close');
const menuNav = document.querySelector('.main-nav');
const menuNavInner = document.querySelector('.main-nav__inner');

menuNavOpen.addEventListener('click', toggleMainNav);
menuNavClose.addEventListener('click', toggleMainNav);

function toggleMainNav() {
    menuNavInner.classList.toggle('main-nav__inner_hidden');
    menuNav.classList.toggle('main-nav__hidden');
}
const container = document.querySelector('.events');
const serverNode = '192.168.31.46'; //поменяйте это поле в соответсвии с вашим урлом

let template = `
    <div class="event {{ type }} {{ size }}">
        <div class="event__close event-control event-control_disabled">
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.061 7l4.72-4.719a.75.75 0 1 0-1.062-1.061L7 5.939l-4.719-4.72A.75.75 0 1 0 1.22 2.282l4.719 4.72-4.72 4.718a.75.75 0 1 0 1.062 1.061l4.72-4.719 4.718 4.72a.748.748 0 0 0 1.061 0 .75.75 0 0 0 0-1.062L8.061 7z"/>
            </svg>
        </div>
        <div class="event__open event-control event-control_disabled">
            <svg width="10" height="16" xmlns="http://www.w3.org/2000/svg" fill="#666" stroke="#666">
                <path d="M8.266 8.691L2.24 14.715a.98.98 0 1 1-1.387-1.387l5.33-5.33-5.33-5.33A.981.981 0 0 1 2.24 1.28l6.025 6.024a.978.978 0 0 1 0 1.387z"/>
            </svg>
        </div>
        <div class="event__main-info">
            <svg class="{{ event__icon }}">
                <use class="event__icon_source" xlink:href="#{{ icon }}"/>
            </svg>
            <span class="{{ event__title }}">{{ title }}</span>
        </div>
        <div class="{{ event__info }}">
            <span class="event__source">{{ source }}</span>
            <span class="event__time">{{ time }}</span>
        </div>
        <div class="additional-info additional-info_disabled">
            <span class="event__description">{{ description }}</span>
            {{data}}
        </div>
        
    </div>
`;

let eventsStr = '';

if (container) {
    fetch(`http://${serverNode}:8000/api/events`)
        .then(res => res.json())
        .then(data => {
            const events = data.events;
            for (let i in events) eventsStr += templater(template, events[i]);
            container.innerHTML += eventsStr;
        })
        .then(() => touchableLogic());
}

function templater(html, data) {
    for (let x in data) {
        let value = data[x];
        if (x === 'type') {
            if (data[x] === 'critical') {
                value = 'event-critical';
                html = html.replace(new RegExp('{{ event__icon }}', 'ig'), 'event__icon event__icon_critical');
                html = html.replace(new RegExp('event__close', 'ig'), 'event__close event__close_white');
                html = html.replace(new RegExp('{{ event__title }}', 'ig'), 'event__title event__title_critical');
            }
            html = html.replace(new RegExp('{{ event__icon }}', 'ig'), 'event__icon');
            html = html.replace(new RegExp('{{ event__title }}', 'ig'), 'event__title');
        }
        if (x === 'size') {
            value = data[x] === 'l' ? 'event-big' : data[x] === 'm' ? 'event-middle' : '';
        }

        if (x === 'description' && data[x]) {
            html = html.replace(new RegExp('additional-info_disabled', 'ig'), '');
            html = html.replace(new RegExp('{{ event__info }}', 'ig'), 'event__info');
        } else {
            html = html.replace(new RegExp('{{ event__info }}', 'ig'), 'event__info event__info_last');
        }

        if (x === 'description' && !data['data']) {
            html = html.replace(new RegExp('{{\\s?' + 'data' + '\\s?}}', 'ig'), '');
        }

        if (x === 'data') {
            if (data['icon'] === 'thermal') {
                value = `
                    <div class="event__data">
                 <div class="data__climate">
                        <div><span class="climate__type">Температура: </span><span class="climate__value">24 С</span></div>
                        <div><span class="climate__type">Влажность: </span><span class="climate__value">80%</span></div>
                    </div>
                    </div>
                `;
            }

            if (data['icon'] === 'fridge') {
                value = `
                 <div class="event__data">
                 <div class="data__buttons">
                        <button class="data__button">Да</button>
                        <button class="data__button">Нет</button>
                    </div>
                    </div>
                `;
            }

            if (data['icon'] === 'music') {
                value = `
                    <div class="event__data">
                    <div class="data__music">
                        <div class="data__music_composition">
                            <img src="./album-cover.png" alt="Обложка альбома" class="data__music_image">
                            <div>
                                <span class="data__music_composition-title">Florence & The Machine - Big God</span>
                                <div class="data__music_composition-range">
                                    <input type="range" min="0" max="271" value="70" class="data__music_composition-range_input">
                                    <span class="data__music_composition-duration">4:31</span>
                                </div>
                            </div>
                        </div>
                        <div class="data__music_composition-controls">
                            <div>
                                <svg class="music__icon music__icon_prev">
                                    <use xlink:href='#music-control'></use>
                                </svg>
                                <svg class="music__icon music__icon_next">
                                    <use xlink:href='#music-control'></use>
                                </svg>
                            </div>
                            <input type="range" min="0" max="100" value="80" class="data__music_composition-volume">
                            <span class="data__music_composition-duration">80%</span>
                        </div>
                    </div>
                </div>
                `;
            }

            if (data['icon'] === 'cam') {
                if (detectIt.hasTouch) {
                    value = `
<div class="event__data">
                 <div class="data__image data__image_wrapper-touchable">
                        <!--<picture>-->
                        <!--<sourse media="(max-width:415px)" srcset="cam.jpg">-->
                        <!--<img srcset="cam.png,-->
                                     <!--cam2x.png 2x,-->
                                     <!--cam3x.png 3x"-->
                             <!--src="cam.png" alt="Снимок камеры с пылесосом">-->
                        <!--</picture>-->
                        <img class="data__image_touchable" srcset="cam.png,
                                     cam2x.png 2x,
                                     cam3x.png 3x"
                             src="cam.png" alt="Снимок камеры с пылесосом">
                    </div>
                    <div class="event__touch-info">
                        <div><span class="touch-info_zoom">Приближение: </span><span class="touch-info__value zoom__value">1.7</span></div>
                        <div><span class="touch-info_brightness">Яркость: </span><span class="touch-info__value brightness__value">50%</span></div>
                    </div>
                    </div>
                `;
                } else {
                    value = `
<div class="event__data">
                 <div class="data__image">
                        <!--<picture>-->
                        <!--<sourse media="(max-width:415px)" srcset="cam.jpg">-->
                        <img class="data__image_touchable" srcset="cam.png,
                                     cam2x.png 2x,
                                     cam3x.png 3x"
                             src="cam.png" alt="Снимок камеры с пылесосом">
                        <!--</picture>-->
                    </div></div>`;
                }
            }

            if (data['icon'] === 'stats') {
                value = `
<div class="event__data">
                 <div class="data__image">
                        <img src="./Richdata.svg" alt="График">
                    </div>
                    </div>
                `;
            }
        }

        let re = '{{\\s?' + x + '\\s?}}';
        html = html.replace(new RegExp(re, 'ig'), value);

    }
    return html;
}




function touchableLogic() {

    const img = document.querySelector('.data__image_touchable');
    const wrapper = document.querySelector('.data__image_wrapper-touchable').getBoundingClientRect();
    const zoomLogger = document.querySelector('.zoom__value');
    const brightnessLogger = document.querySelector('.brightness__value');

    let gestures = {};

    const state = {
        moving: false,
        scaling: false,
        rotating: false,
        startPosition: {x: 0, y: 0},
        scale: 1.7,
        brightness: 0.8,
        prevDist: 0,
        prevRotate: 0
    };

    img.addEventListener("pointerdown", e => {

        gestures[e.pointerId] = {
            start: {x: e.x, y: e.y},
            prev: {x: e.x, y: e.y},
            startPosition: {x: state.startPosition.x, y: state.startPosition.y}
        };

        if (Object.keys(gestures).length === 1) state.moving = true;
        else if (Object.keys(gestures).length === 2) {
            state.moving = false;
            state.scaling = true;
            state.rotating = true;
        }

    });

    img.addEventListener("pointermove", e => {
        if (state.moving) move(e);
        if (state.scaling) pinch(e);
        if (state.rotating) rotate(e);
    });

    img.addEventListener("pointerup", pointerFinish);

    function move(e) {
        const dx = e.x - gestures[e.pointerId].start.x;
        // const dy = event.y - gestures[e.pointerId].start.y;

        let imgInfo = img.getBoundingClientRect();

        if ((wrapper.left >= imgInfo.left + dx) && (wrapper.right <= imgInfo.left + imgInfo.width + dx)) {
            state.startPosition.x = gestures[e.pointerId].startPosition.x + dx;
            img.style.transform = ` scale(${state.scale}) translateX(${state.startPosition.x}px) translateY(${state.startPosition.y}px)`;
            gestures[e.pointerId].prev = {x: e.x, y: e.y};
        }

        // nodeState.startPosition.y = gestures[event.pointerId].startPosition.y + dy;
        // img.style.transform = ` scale(${nodeState.scale}) translateX(${nodeState.startPosition.x}px) translateY(${nodeState.startPosition.y}px)`;
        // gestures[event.pointerId].prev = {x: event.x, y: event.y};
    };

    function pinch(e) {
        const maxScale = 3.3;
        const minScale = 1.3;

        const pointers = [];
        for (let i in gestures) pointers.push({x: gestures[i].prev.x, y: gestures[i].prev.y});
        const dist = Math.sqrt(Math.pow(pointers[0].x - pointers[1].x, 2) + Math.pow(pointers[0].y - pointers[1].y, 2));

        let newScale = dist < state.prevDist ? 0.99 * state.scale : 1.01 * state.scale;
        if (newScale > maxScale) newScale = maxScale;
        if (newScale <= minScale) newScale = minScale;

        state.scale = newScale;
        state.prevDist = dist;

        zoomLogger.innerText = state.scale.toFixed(1);
        img.style.transform = ` scale(${state.scale}) translateX(${state.startPosition.x}px) translateY(${state.startPosition.y}px)`;

        gestures[e.pointerId].prev = {x: e.x, y: e.y};
    };

    function rotate(e) {
        const maxBrightness = 1;
        const minBrightness = 0;

        const pointers = [];
        for (let i in gestures) pointers.push({x: gestures[i].prev.x, y: gestures[i].prev.y});
        let rotate = Math.atan((pointers[1].y - pointers[0].y) / (pointers[1].x - pointers[0].x));
        if (Math.abs(rotate - state.prevRotate) > Math.PI) rotate -= -Math.PI;

        let newBrightness = rotate > state.prevRotate ? 1.01 * state.brightness : 0.99 * state.brightness;
        if (newBrightness > maxBrightness) newBrightness = maxBrightness;
        if (newBrightness <= minBrightness) newBrightness = minBrightness;

        state.brightness = newBrightness;
        state.prevRotate = rotate;

        brightnessLogger.innerText = `${parseInt(state.brightness * 100)}%`;
        img.style.filter = `brightness(${state.brightness})`;

        gestures[e.pointerId].prev = {x: e.x, y: e.y};
    }

    function pointerFinish(e) {
        state.moving = false;
        state.scaling = false;
        state.rotating = false;
        delete gestures[e.pointerId];
    }
}



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
                .then(() => {
                    if (!video.paused) {
                        video.classList.add('visually-hidden');
                        initializer.classList.add('hidden');
                        ctx = canvas.getContext('2d');
                        camera = new Camera(video, canvas);
                        setOfCameras.push(camera);
                        camera.canvas.addEventListener('click', canvasChecker);
                        loop();
                    } else {
                    }
                })
                .catch(() => {
                    initializer.classList.remove('hidden');
                    initVideo(video, canvas, url)
                })
        })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            video.play()
                .then(() => {
                    if (!video.paused) {
                        initializer.classList.add('hidden');
                        video.classList.add('visually-hidden');
                        ctx = canvas.getContext('2d');
                        camera = new Camera(video, canvas);
                        setOfCameras.push(camera);
                        camera.canvas.addEventListener('click', canvasChecker);
                        loop()
                    }
                })
                .catch(() => {
                    initializer.classList.remove('hidden');
                    initVideo(video, canvas, url)
                })
        });
    }

    function canvasChecker(e) {
        const activeCamera = setOfCameras.find(item => item.fullscreen === true);
        if (activeCamera) {
            activeCamera.toggleFullscreen();
            if (activeCamera.canvas === e.target) return;
        }
        let currentCamera = setOfCameras.find(item => item.canvas === e.target);
        currentCamera.toggleFullscreen();
        brightness.value = currentCamera.filters.brightness;
        contrast.value = currentCamera.filters.contrast;
        currentCamera.cameraVolume.context.resume().then(() => {
            equalize(currentCamera);
        });
    }


    function loop() {
        requestAnimationFrame(loop);
        camera.canvas.width = camera.video.videoWidth;
        camera.canvas.height = camera.video.videoHeight;
        ctx.filter = `brightness(${camera.filters.brightness}%) contrast(${camera.filters.contrast}%)`;
        ctx.drawImage(camera.video, 0, 0);
    }
}


function applyFilter(type, value) {
    const activeCamera = setOfCameras.find(item => item.fullscreen === true);

    if (activeCamera) {
        if (type === 'brightness') {
            updateBrightness(activeCamera, value);
        }

        if (type === 'contrast') {
            updateContrast(activeCamera, value);
        }
    }
}

function updateBrightness(camera, value) {
    camera.filters.brightness = value;
}

function updateContrast(camera, value) {
    camera.filters.contrast = value;
}

function returnFromFullscreen() {
    const activeCamera = setOfCameras.find(item => item.fullscreen === true);
    if (activeCamera) {
        activeCamera.toggleFullscreen();
    }
    button.classList.add('camera-button_hidden');
}


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
        console.log(average);

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
