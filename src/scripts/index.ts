import Flux from "./flux/index";
import {navActions, navCallbacks, navTempl, NavView} from "./blocks/navigation";
import {footerTempl, FooterView} from "./blocks/footer";
import {ContentView, pagesContent} from "./blocks/content/content";
import {rootTempl, RootView} from "./blocks/root";


const store = new Flux.Store({activePage: 'Сводка'});
const initState: object = store.getState();

const viewRoot = new RootView(document.getElementById('root'), rootTempl).update();
const viewNav = new NavView(document.getElementById('header'), navTempl, navActions).update(initState);
const viewFooter = new FooterView(document.getElementById('footer'), footerTempl).update();
//@ts-ignore
const activePage = pagesContent.find(item => item.page === store.getState().activePage);
store.subscribe(viewNav).setResponses(navCallbacks);

if (activePage) {
    const viewContent = new ContentView(document.getElementById('content'), activePage.template, activePage.actions).update(initState);
    store.subscribe(viewContent);
    pagesContent.forEach(item => {
        if (item.callbacks) store.setResponses(item.callbacks);
    });
}


Flux.Dispatcher.register(store);


