var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../../flux/index", "./devices", "./events", "./scenarios", "./svodka", "./video"], function (require, exports, index_1, devices_1, events_1, scenarios_1, svodka_1, video_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    const pagesContent = [devices_1.contentDevices, events_1.contentEvents, scenarios_1.contentScenarios, svodka_1.contentSvodka, video_1.contentVideo];
    exports.pagesContent = pagesContent;
    class ContentView extends index_1.default.View {
        constructor(node, template, actions) {
            super(node, template, actions);
            this.node.innerHTML = this.template;
            this.currPage = '';
        }
        update(state) {
            // @ts-ignore
            if (this.currPage !== state.activePage) {
                // @ts-ignore
                const activePage = pagesContent.find(item => item.page === state.activePage);
                if (activePage) {
                    this.actions = activePage.actions;
                    this.node.innerHTML = activePage.template;
                    activePage.functions();
                    this.initActions(this.node);
                }
                // @ts-ignore
                this.currPage = state.activePage;
            }
            return this;
        }
        ;
    }
    exports.ContentView = ContentView;
});
