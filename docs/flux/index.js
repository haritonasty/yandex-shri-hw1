var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./dispatcher", "./store", "./view", "./action"], function (require, exports, dispatcher_1, store_1, view_1, action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    dispatcher_1 = __importDefault(dispatcher_1);
    const Flux = { Store: store_1.Store, Dispatcher: dispatcher_1.default, View: view_1.View, Action: action_1.Action };
    exports.default = Flux;
});
