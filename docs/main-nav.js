define(["require", "exports", "template"], function (require, exports, template_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import { video } from 'video';
    const menuNavOpen = document.querySelector('.button-burger');
    const menuNavClose = document.querySelector('.button-close');
    const menuNav = document.querySelector('.main-nav');
    const menuNavInner = document.querySelector('.main-nav__inner');
    if (menuNavOpen && menuNavClose) {
        menuNavOpen.addEventListener('click', toggleMainNav);
        menuNavClose.addEventListener('click', toggleMainNav);
    }
    function toggleMainNav() {
        if (menuNavInner && menuNav) {
            menuNavInner.classList.toggle('main-nav__inner_hidden');
            menuNav.classList.toggle('main-nav__hidden');
        }
    }
    template_1.template();
});
//video();
