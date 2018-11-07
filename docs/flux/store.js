define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Store {
        constructor(state = {}) {
            const savedState = localStorage.getItem("storeState");
            this.observers = [];
            this.state = savedState ? JSON.parse(savedState) : state;
            this.responses = new Map();
        }
        getState() {
            return this.state;
        }
        subscribe(view) {
            this.observers.push(view);
            return this;
        }
        change() {
            console.log(this.state);
            this.observers.forEach(view => view.update(this.state));
        }
        checkAction(action) {
            if (this.responses.has(action.type)) {
                const cb = this.responses.get(action.type);
                if (cb) {
                    cb(action.data);
                    localStorage.setItem("storeState", JSON.stringify(this.state));
                    this.change();
                }
            }
        }
        setResponses(responses) {
            responses.forEach((value, key) => {
                if (value)
                    this.responses.set(key, value.bind(this));
            });
            return this;
        }
    }
    exports.Store = Store;
});
