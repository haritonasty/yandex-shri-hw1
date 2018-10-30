define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const detectHover = {
        hover: false,
        none: false,
        anyHover: false,
        anyNone: false,
        update() {
            if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
                this.hover = window.matchMedia('(hover: hover)').matches;
                this.none = (window.matchMedia('(hover: none)').matches ||
                    window.matchMedia('(hover: on-demand)').matches);
                this.anyHover = window.matchMedia('(any-hover: hover)').matches;
                this.anyNone = (window.matchMedia('(any-hover: none)').matches ||
                    window.matchMedia('(any-hover: on-demand)').matches);
            }
        },
    };
    const detectPointer = {
        fine: false,
        coarse: false,
        none: false,
        anyFine: false,
        anyCoarse: false,
        anyNone: false,
        update() {
            if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
                this.fine = window.matchMedia('(pointer: fine)').matches;
                this.coarse = window.matchMedia('(pointer: coarse)').matches;
                this.none = window.matchMedia('(pointer: none)').matches;
                this.anyFine = window.matchMedia('(any-pointer: fine)').matches;
                this.anyCoarse = window.matchMedia('(any-pointer: coarse)').matches;
                this.anyNone = window.matchMedia('(any-pointer: none)').matches;
            }
        },
    };
    const detectTouchEvents = {
        hasSupport: false,
        update() {
            if (typeof window !== 'undefined') {
                this.hasSupport = 'ontouchstart' in window;
            }
        },
    };
    const detectPassiveEvents = {
        hasSupport: false,
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
    exports.detectIt = {
        deviceType: '',
        primaryInput: '',
        hasMouse: false,
        hasTouch: false,
        passiveEvents: false,
        state: {
            detectHover,
            detectPointer,
            detectTouchEvents,
            detectPassiveEvents,
        },
        update() {
            this.state.detectHover.update();
            this.state.detectPointer.update();
            this.state.detectTouchEvents.update();
            this.state.detectPassiveEvents.update();
            this.updateOnlyOwnProperties();
        },
        updateOnlyOwnProperties() {
            if (typeof window !== 'undefined') {
                this.passiveEvents = this.state.detectPassiveEvents.hasSupport || false;
                this.hasTouch = this.state.detectTouchEvents.hasSupport || false;
                this.deviceType = this.hasTouch ? 'touchOnly' : 'mouseOnly';
                if (this.hasTouch &&
                    Object.keys(this.state.detectHover)
                        .filter(key => key !== 'update')
                        .every(key => this.state.detectHover[key] === false) &&
                    Object.keys(this.state.detectPointer)
                        .filter(key => key !== 'update')
                        .every(key => this.state.detectPointer[key] === false)) {
                    if (window.navigator && /android/.test(window.navigator.userAgent.toLowerCase())) {
                        this.deviceType = 'touchOnly';
                    }
                    this.deviceType = 'hybrid';
                }
                if (this.hasTouch &&
                    (this.state.detectHover.anyHover || this.state.detectPointer.anyFine)) {
                    this.deviceType = 'hybrid';
                }
                this.hasMouse = this.deviceType !== 'touchOnly';
                this.primaryInput =
                    (this.deviceType === 'mouseOnly' && 'mouse') ||
                        (this.deviceType === 'touchOnly' && 'touch') ||
                        (this.state.detectPointer.fine && 'mouse') ||
                        (this.state.detectPointer.coarse && 'touch') ||
                        'mouse';
                const inVersionRange = (version) => version >= 59 && version < 62;
                const str = /Chrome\/([0-9.]+)/.exec(navigator.userAgent);
                if (str && str[1] !== null) {
                    const isAffectedWindowsChromeVersion = /windows/.test(window.navigator.userAgent.toLowerCase()) &&
                        /chrome/.test(window.navigator.userAgent.toLowerCase()) &&
                        inVersionRange(parseInt(str[1], 10));
                    if (isAffectedWindowsChromeVersion && this.hasTouch) {
                        this.deviceType = 'hybrid';
                        this.hasMouse = true;
                        this.primaryInput = 'mouse';
                    }
                }
            }
        },
    };
    exports.detectIt.update();
    if ((exports.detectIt.deviceType === 'hybrid' || exports.detectIt.deviceType === 'mouseOnly')
        && exports.detectIt.hasMouse && exports.detectIt.primaryInput === 'mouse') {
        document.body.classList.add('hasHover');
    }
});
