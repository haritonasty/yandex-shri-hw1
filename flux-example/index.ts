import Flux from "../src/scripts/flux/index";
import {rootTempl, RootView} from "./app/root";
// import {counterCallbacks, CounterView, counterActions, counterTempl} from "./app/counter";
import {navActions, navCallbacks, navTempl, NavView} from "./app/navigation";
import {ContentView, pagesContent} from "./app/content/content";


const store = new Flux.Store({
    count: 5,
    activePage: 'Сводка'
});
const initState: object = store.getState();


const viewRoot = new RootView(document.getElementById('root'), rootTempl).update();
const viewNav = new NavView(document.getElementById('nav'), navTempl, navActions).update(initState);
// @ts-ignore
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


