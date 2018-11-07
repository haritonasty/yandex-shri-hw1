define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const svodkaTempl = `
<div class="main-wrapper">
            <h1 class="main-title">Последние новости</h1>
            <p class="events">Пока здесь пусто.</p>
        </div>
`;
    const contentSvodka = {
        page: 'Сводка',
        template: svodkaTempl,
        functions: () => { }
    };
    exports.contentSvodka = contentSvodka;
});
