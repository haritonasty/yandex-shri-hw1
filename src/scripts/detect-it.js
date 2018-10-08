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