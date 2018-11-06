"use strict";
exports.__esModule = true;
var Store = /** @class */ (function () {
    function Store(state, observers) {
        if (state === void 0) { state = {}; }
        if (observers === void 0) { observers = []; }
        this.observers = observers;
        this.state = state;
        this.responses = new Map();
    }
    Store.prototype.getState = function () {
        return this.state;
    };
    Store.prototype.setState = function (state) {
        this.state = state;
    };
    Store.prototype.subscribe = function (view) {
        this.observers.push(view);
        return this;
    };
    Store.prototype.change = function () {
        this.observers.forEach(function (view) { return view.update(); });
    };
    Store.prototype.checkAction = function (action) {
        if (this.responses.has(action)) {
            var payload = this.responses.get(action);
            if (payload) {
                payload();
                this.change();
            }
        }
    };
    Store.prototype.setResponses = function (responses) {
        var _this = this;
        responses.forEach(function (action) {
            _this.responses.set(action.type, action.payload);
        });
        return this;
    };
    return Store;
}());
exports.Store = Store;
