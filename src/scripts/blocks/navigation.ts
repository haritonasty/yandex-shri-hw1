import Flux from "../flux/index";
import {template} from "./content/contentFunctions/template";

type CallbackFunction = () => void;

const navTempl: string = `
<div class="header__inner">
            <a class="logo header__logo">
                <img src="./logo.svg" alt="ЯндексДОМ" class="logo__img">
            </a>

            <button class="button-burger header__button-burger" type="button">
                <span class="visually-hidden">Открыть меню</span>
            </button>
            <nav class="main-nav main-nav__hidden page__main-nav">
                <div class="main-nav__inner main-nav__inner_hidden">
                    <button class="button-close main-nav__button-close" type="button">
                        <span class="visually-hidden">Закрыть меню</span>
                    </button>
                    <ul class="main-nav__items">
                        <li class="main-nav__item">
                            <a class="main-nav__item-link" href="#" data-event="click=changePage">События</a>
                        </li>
                        <li class="main-nav__item">
                            <a class="main-nav__item-link" href="#" data-event="click=changePage">Видеонаблюдение</a>
                        </li>
                        <li class="main-nav__item">
                            <a class="main-nav__item-link" href="#" data-event="click=changePage">Сводка</a>
                        </li>
                        <li class="main-nav__item">
                            <a class="main-nav__item-link" href="#" data-event="click=changePage">Устройства</a>
                        </li>
                        <li class="main-nav__item main-nav__item_last">
                            <a class="main-nav__item-link" href="#" data-event="click=changePage">Сценарии</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
`;


const navActions = new Map()
    .set('changePage', (e: Event) => Flux.Dispatcher.dispatch(new Flux.Action('CHANGE_PAGE', e)));


class NavView extends Flux.View {
    private currPage: string;
    private currLink: HTMLElement | null;

    constructor(node: HTMLElement | null, template: string, actions?: Map<string, CallbackFunction>) {
        super(node, template, actions);
        this.node.innerHTML = this.template;
        this.currPage = '';
        this.currLink = null;
        this.initActions(this.node);
        navLogic();
    }

    update(state: object): this {
        // @ts-ignore
        if (this.currPage !== state.activePage) {
            const links: Array<HTMLLinkElement> | null = Array.from(this.node.querySelectorAll('.main-nav__item-link'));
            // @ts-ignore
            const activeLink = links.find(link => link.innerText === state.activePage);
            if (activeLink && activeLink.parentElement) {
                if (this.currLink) this.currLink.classList.remove('main-nav__item_active');
                const activeItem = activeLink.parentElement;
                activeItem.classList.add('main-nav__item_active');
                this.currLink = activeItem;
            }
            // @ts-ignore
            this.currPage = state.activePage;
        }
        return this;
    };
}

const navCallbacks = new Map()
    .set('CHANGE_PAGE', function (e: Event) {
        // @ts-ignore
        this.state.activePage = e.target.innerText;
    });


const navLogic = () => {

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

};


export {navTempl, NavView, navCallbacks, navActions};

