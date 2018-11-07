var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../flux/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    const navTempl = `
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
    exports.navTempl = navTempl;
    const navActions = new Map()
        .set('changePage', (e) => index_1.default.Dispatcher.dispatch(new index_1.default.Action('CHANGE_PAGE', e)));
    exports.navActions = navActions;
    class NavView extends index_1.default.View {
        constructor(node, template, actions) {
            super(node, template, actions);
            this.node.innerHTML = this.template;
            this.currPage = '';
            this.currLink = null;
            this.initActions(this.node);
            navLogic();
        }
        update(state) {
            // @ts-ignore
            if (this.currPage !== state.activePage) {
                const links = Array.from(this.node.querySelectorAll('.main-nav__item-link'));
                // @ts-ignore
                const activeLink = links.find(link => link.innerText === state.activePage);
                if (activeLink && activeLink.parentElement) {
                    if (this.currLink)
                        this.currLink.classList.remove('main-nav__item_active');
                    const activeItem = activeLink.parentElement;
                    activeItem.classList.add('main-nav__item_active');
                    this.currLink = activeItem;
                }
                // @ts-ignore
                this.currPage = state.activePage;
            }
            return this;
        }
        ;
    }
    exports.NavView = NavView;
    const navCallbacks = new Map()
        .set('CHANGE_PAGE', function (e) {
        // @ts-ignore
        this.state.activePage = e.target.innerText;
    });
    exports.navCallbacks = navCallbacks;
    const navLogic = () => {
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
    };
});
