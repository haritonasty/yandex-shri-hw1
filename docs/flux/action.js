define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Action {
        constructor(type, data) {
            this.type = type;
            this.data = data;
        }
    }
    exports.Action = Action;
});
