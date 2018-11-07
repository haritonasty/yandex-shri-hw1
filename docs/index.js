var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./flux/index", "./blocks/navigation", "./blocks/footer", "./blocks/content/content", "./blocks/root"], function (require, exports, index_1, navigation_1, footer_1, content_1, root_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    const store = new index_1.default.Store({ activePage: 'События' });
    const initState = store.getState();
    const viewRoot = new root_1.RootView(document.getElementById('root'), root_1.rootTempl).update();
    const viewNav = new navigation_1.NavView(document.getElementById('header'), navigation_1.navTempl, navigation_1.navActions).update(initState);
    const viewFooter = new footer_1.FooterView(document.getElementById('footer'), footer_1.footerTempl).update();
    //@ts-ignore
    const activePage = content_1.pagesContent.find(item => item.page === store.getState().activePage);
    store.subscribe(viewNav).setResponses(navigation_1.navCallbacks);
    if (activePage) {
        const viewContent = new content_1.ContentView(document.getElementById('content'), activePage.template, activePage.actions).update(initState);
        store.subscribe(viewContent);
        content_1.pagesContent.forEach(item => {
            if (item.callbacks)
                store.setResponses(item.callbacks);
        });
    }
    index_1.default.Dispatcher.register(store);
});
