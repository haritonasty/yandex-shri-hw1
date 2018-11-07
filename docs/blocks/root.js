var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../flux/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    const rootTempl = `
    <header class="header page__header" id="header"></header>
    <main class="main main_events" id="content"></main>
    <footer class="footer page__footer" id="footer"></footer>
`;
    exports.rootTempl = rootTempl;
    class RootView extends index_1.default.View {
        constructor(node, template) {
            super(node, template);
        }
        update() {
            this.node.innerHTML = this.template;
            return this;
        }
        ;
    }
    exports.RootView = RootView;
});
