import { template } from 'template';
import 'video';

const menuNavOpen = document.querySelector('.button-burger');
const menuNavClose: HTMLButtonElement | null = document.querySelector('.button-close');
const menuNav: HTMLElement | null = document.querySelector('.main-nav');
const menuNavInner: HTMLDivElement | null = document.querySelector('.main-nav__inner');
if (menuNavOpen && menuNavClose) {
  menuNavOpen.addEventListener('click', toggleMainNav);
  menuNavClose.addEventListener('click', toggleMainNav);
}

function toggleMainNav(): void {
  if (menuNavInner && menuNav) {
    menuNavInner.classList.toggle('main-nav__inner_hidden');
    menuNav.classList.toggle('main-nav__hidden');
  }
}

template();
