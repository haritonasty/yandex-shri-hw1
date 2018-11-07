define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Dispatcher {
        constructor() {
            this.callbacks = [];
        }
        register(store) {
            this.callbacks.push(store.checkAction.bind(store));
        }
        dispatch(action) {
            this.callbacks.forEach(callback => callback(action));
            this.logger(action.type);
        }
        logger(action) {
            console.log(`ACTION: ${action}`);
        }
    }
    exports.default = new Dispatcher();
});
