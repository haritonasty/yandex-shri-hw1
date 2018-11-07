define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const scenariosTempl = `
<div class="main-wrapper">
            <h1 class="main-title">Сценарии УмногоДома</h1>
            <p class="events">Пока здесь пусто.</p>
        </div>
`;
    const contentScenarios = {
        page: 'Сценарии',
        template: scenariosTempl,
        functions: () => { }
    };
    exports.contentScenarios = contentScenarios;
});
