define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const devicesTempl = `
<div class="main-wrapper">
            <h1 class="main-title">Устройства УмногоДома</h1>
            <p class="events">Пока здесь пусто.</p>
        </div>
`;
    const contentDevices = {
        page: 'Устройства',
        template: devicesTempl,
        functions: () => { }
    };
    exports.contentDevices = contentDevices;
});
