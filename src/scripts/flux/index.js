"use strict";
exports.__esModule = true;
var dispatcher_1 = require("./dispatcher");
var store_1 = require("./store");
var view_1 = require("./view");
var Flux = { Store: store_1.Store, Dispatcher: dispatcher_1["default"], View: view_1.View };
exports["default"] = Flux;
