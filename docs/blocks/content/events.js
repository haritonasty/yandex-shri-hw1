define(["require", "exports", "./contentFunctions/template"], function (require, exports, template_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const eventsTempl = `
<div class="main-wrapper">
            <h1 class="main-title">Лента событий</h1>
            <div class="events"></div>
        </div>
`;
    const contentEvents = {
        page: 'События',
        template: eventsTempl,
        functions: () => {
            template_1.template();
        }
    };
    exports.contentEvents = contentEvents;
});
