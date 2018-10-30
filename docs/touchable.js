define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function touchable() {
        const img = document.querySelector('.data__image_touchable');
        const wrapperEl = document.querySelector('.data__image_wrapper-touchable');
        const wrapper = wrapperEl ? wrapperEl.getBoundingClientRect() : null;
        const zoomLogger = document.querySelector('.zoom__value');
        const brightnessLogger = document.querySelector('.brightness__value');
        const gestures = {};
        if (img) {
            const state = {
                moving: false,
                scaling: false,
                rotating: false,
                startPosition: { x: 0, y: 0 },
                scale: 1.7,
                brightness: 0.8,
                prevDist: 0,
                prevRotate: 0,
            };
            img.addEventListener('pointerdown', (e) => {
                gestures[e.pointerId] = {
                    start: { x: e.x, y: e.y },
                    prev: { x: e.x, y: e.y },
                    startPosition: { x: state.startPosition.x, y: state.startPosition.y },
                };
                if (Object.keys(gestures).length === 1)
                    state.moving = true;
                else if (Object.keys(gestures).length === 2) {
                    state.moving = false;
                    state.scaling = true;
                    state.rotating = true;
                }
            });
            img.addEventListener('pointermove', (e) => {
                if (state.moving)
                    move(e);
                if (state.scaling)
                    pinch(e);
                if (state.rotating)
                    rotate(e);
            });
            img.addEventListener('pointerup', pointerFinish);
            function move(e) {
                const dx = e.x - gestures[e.pointerId].start.x;
                const imgInfo = img ? img.getBoundingClientRect() : null;
                if (wrapper && img && imgInfo) {
                    if ((wrapper.left >= imgInfo.left + dx) &&
                        (wrapper.right <= imgInfo.left + imgInfo.width + dx)) {
                        state.startPosition.x = gestures[e.pointerId].startPosition.x + dx;
                        img.style.transform = ` scale(${state.scale})
                                  translateX(${state.startPosition.x}px)
                                  translateY(${state.startPosition.y}px)`;
                        gestures[e.pointerId].prev = { x: e.x, y: e.y };
                    }
                }
            }
            function pinch(e) {
                const maxScale = 3.3;
                const minScale = 1.3;
                const pointers = [];
                for (const i in gestures) {
                    pointers.push({
                        x: gestures[i].prev.x,
                        y: gestures[i].prev.y,
                    });
                }
                const dist = Math.sqrt(Math.pow(pointers[0].x - pointers[1].x, 2) +
                    Math.pow(pointers[0].y - pointers[1].y, 2));
                let newScale = dist < state.prevDist ? 0.99 * state.scale : 1.01 * state.scale;
                if (newScale > maxScale)
                    newScale = maxScale;
                if (newScale <= minScale)
                    newScale = minScale;
                state.scale = newScale;
                state.prevDist = dist;
                if (zoomLogger)
                    zoomLogger.innerText = state.scale.toFixed(1);
                if (img) {
                    img.style.transform = `scale(${state.scale})
                               translateX(${state.startPosition.x}px)
                               translateY(${state.startPosition.y}px)`;
                }
                gestures[e.pointerId].prev = { x: e.x, y: e.y };
            }
            function rotate(e) {
                const maxBrightness = 1;
                const minBrightness = 0;
                const pointers = [];
                for (const i in gestures) {
                    pointers.push({ x: gestures[i].prev.x, y: gestures[i].prev.y });
                }
                let rotate = Math.atan((pointers[1].y - pointers[0].y) / (pointers[1].x - pointers[0].x));
                if (Math.abs(rotate - state.prevRotate) > Math.PI)
                    rotate -= -Math.PI;
                let newBrightness = rotate > state.prevRotate
                    ? 1.01 * state.brightness
                    : 0.99 * state.brightness;
                if (newBrightness > maxBrightness)
                    newBrightness = maxBrightness;
                if (newBrightness <= minBrightness)
                    newBrightness = minBrightness;
                state.brightness = newBrightness;
                state.prevRotate = rotate;
                if (brightnessLogger)
                    brightnessLogger.innerText = `${state.brightness * 100}%`;
                if (img)
                    img.style.filter = `brightness(${state.brightness})`;
                gestures[e.pointerId].prev = { x: e.x, y: e.y };
            }
            function pointerFinish(e) {
                state.moving = false;
                state.scaling = false;
                state.rotating = false;
                delete gestures[e.pointerId];
            }
        }
    }
    exports.default = touchable;
});
