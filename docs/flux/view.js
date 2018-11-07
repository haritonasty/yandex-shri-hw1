define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class View {
        constructor(node, temp, actions) {
            if (node === null)
                throw new Error("Error with mounting in DOM. DOMNode wasn't found.");
            this.node = node;
            this.template = temp;
            if (actions) {
                this.actions = actions;
            }
        }
        initActions(el) {
            const events = el.querySelectorAll('[data-event]');
            if (events) {
                const eventsArray = Array.from(events);
                eventsArray.forEach((eventNode) => {
                    const event = eventNode.getAttribute('data-event');
                    if (event) {
                        const eventData = event.split('=');
                        const eventType = eventData[0];
                        if (this.actions) {
                            const eventAction = this.actions.get(eventData[1]);
                            if (eventAction) {
                                eventNode.addEventListener(eventType, eventAction);
                            }
                        }
                    }
                });
            }
        }
    }
    exports.View = View;
});
