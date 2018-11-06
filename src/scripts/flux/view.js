"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View(node, store, temp, actions) {
        this.node = node;
        this.template = temp;
        this.actions = actions;
        this.store = store;
        this.state = this.getData();
        this.node.innerHTML = this.templater(this.template, this.state);
        this.initActions(this.node);
    }
    View.prototype.getData = function () {
        return this.store.getState();
    };
    View.prototype.initActions = function (el) {
        var _this = this;
        var events = el.querySelectorAll('[data-event]');
        if (events) {
            var eventsArray = Array.from(events);
            eventsArray.forEach(function (eventNode) {
                var event = eventNode.getAttribute('[data-event]');
                if (event) {
                    var eventData = event.split('=');
                    var eventType = eventData[0];
                    var eventAction = _this.actions.get(eventData[1]);
                    if (eventAction) {
                        eventNode.addEventListener(eventType, eventAction);
                    }
                }
            });
        }
    };
    View.prototype.update = function () {
        var newState = this.getData();
        this.node.innerHTML = this.templater(this.template, newState);
    };
    View.prototype.templater = function (template, data) {
        var matches = template.match(/{{.+?}}/g);
        var html = template;
        if (matches) {
            matches.forEach(function (str) {
                str = str.replace('{{', '').replace('}}', '');
                if (data[str]) {
                    html = html.replace('{{' + str + '}}', data[str]);
                }
            });
        }
        return html;
    };
    return View;
}());
exports.View = View;
