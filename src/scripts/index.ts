import { template } from 'template';

import Flux from "./flux/index";
import {navActions, navCallbacks, navTempl, NavView} from "./blocks/navigation";
// import {ContentView, pagesContent} from "./app/content/content";


const store = new Flux.Store({
    count: 5,
    activePage: 'Сводка'
});
const initState: object = store.getState();


// const viewRoot = new RootView(document.getElementById('root'), rootTempl).update();
const viewNav = new NavView(document.getElementById('header'), navTempl, navActions).update(initState);
// @ts-ignore
// const activePage = pagesContent.find(item => item.page === store.getState().activePage);
store.subscribe(viewNav).setResponses(navCallbacks);

// if (activePage) {
//     const viewContent = new ContentView(document.getElementById('content'), activePage.template, activePage.actions).update(initState);
//     store.subscribe(viewContent);
//     pagesContent.forEach(item => {
//         if (item.callbacks) store.setResponses(item.callbacks);
//     });
// }


Flux.Dispatcher.register(store);






//
//
//
// const menuNavOpen = document.querySelector('.button-burger');
// const menuNavClose: HTMLButtonElement | null = document.querySelector('.button-close');
// const menuNav: HTMLElement | null = document.querySelector('.main-nav');
// const menuNavInner: HTMLDivElement | null = document.querySelector('.main-nav__inner');
// if (menuNavOpen && menuNavClose) {
//   menuNavOpen.addEventListener('click', toggleMainNav);
//   menuNavClose.addEventListener('click', toggleMainNav);
// }
//
// function toggleMainNav(): void {
//   if (menuNavInner && menuNav) {
//     menuNavInner.classList.toggle('main-nav__inner_hidden');
//     menuNav.classList.toggle('main-nav__hidden');
//   }
// }
//
// template();
