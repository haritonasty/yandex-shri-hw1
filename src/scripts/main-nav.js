const menuNavOpen = document.querySelector('.button-burger');
const menuNavClose = document.querySelector('.button-close');
const menuNav = document.querySelector('.main-nav');
const menuNavInner = document.querySelector('.main-nav__inner');

menuNavOpen.addEventListener('click', toggleMainNav);
menuNavClose.addEventListener('click', toggleMainNav);

function toggleMainNav() {
    menuNavInner.classList.toggle('main-nav__inner_hidden');
    menuNav.classList.toggle('main-nav__hidden');
}