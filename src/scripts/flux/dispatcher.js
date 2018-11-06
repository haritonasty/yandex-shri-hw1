"use strict";
exports.__esModule = true;
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.callbacks = [];
    }
    Dispatcher.prototype.register = function (store) {
        this.callbacks.push(store.checkAction.bind(store));
    };
    Dispatcher.prototype.dispatch = function (action) {
        this.callbacks.forEach(function (callback) { return callback(action); });
        this.logger(action);
    };
    Dispatcher.prototype.logger = function (action) {
        console.log("ACTION: " + action);
    };
    return Dispatcher;
}());
exports["default"] = Dispatcher;
