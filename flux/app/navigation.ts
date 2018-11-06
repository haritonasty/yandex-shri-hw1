import Flux from "../lib/index";
type CallbackFunction = () => void;

const navTempl: string = `
<nav>
<a class="main-nav__item-link" href="#" data-event="click=changePage">Видеонаблюдение</a>
<a class="main-nav__item-link" href="#" data-event="click=changePage">Сводка</a>
</nav>`;


const navActions = new Map()
    .set('changePage', (e: Event) => Flux.Dispatcher.dispatch(new Flux.Action('CHANGE_PAGE', e)));


class NavView extends Flux.View {
    constructor(node: HTMLElement | null, template: string, actions?: Map<string, CallbackFunction>) {
        super(node, template, actions);
    }

    update(state: object): this {

        this.node.innerHTML = this.template;
        const links: Array<HTMLLinkElement> | null = Array.from(this.node.querySelectorAll('.main-nav__item-link'));
        // @ts-ignore
        const activeLink = links.find(link => link.innerText === state.activePage);
        if (activeLink) {
            activeLink.classList.add('main-nav__item-link_active');
        }
        this.initActions(this.node);
        return this;
    };
}

const navCallbacks = new Map()
    .set('CHANGE_PAGE', function (e: Event) {
        // @ts-ignore
        this.state.activePage = e.target.innerText;
    });

export {navTempl, NavView, navCallbacks, navActions};
