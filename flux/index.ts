import Flux from "./lib/index";
import {View} from "./lib/view";
import {Action} from "./lib/action";


const Navigation: string = `
<nav>
<a class="main-nav__item-link" href="#" data-event="click=changePage">{{nav-item}}</a>
<a class="main-nav__item-link" href="" data-event="click=changePage">{{nav-item}}</a>
<a class="main-nav__item-link" href="#" data-event="click=changePage">{{nav-item}}</a>
</nav>`;

const ROOT: string = `
<div id="navigation">зашлушка для навигации</div>
<div id="page">заглушка для контента</div>
`;

const root = document.querySelector<HTMLElement>('#root');

if (root) {
    const ViewRoot = new Flux.View(root, ROOT);
}

const navigation = document.querySelector<HTMLElement>('#navigation');

if (navigation) {
    const store = new Flux.Store({nav: ['События', 'Видеонаблюдение', 'Сводка']});
    const ViewNavigation = new Flux.View(navigation, Navigation);
}
// const dispatcher = new Flux.Dispatcher();
//
// const actions = new Map();
// actions.set('inc', () => dispatcher.dispatch(new Action('INCREASE')));
// actions.set('dec', () => dispatcher.dispatch(new Action('DECREASE')));
//
//
// const callbacks = [
//     new Action(
//         'INCREASE',
//         function () {
//             // @ts-ignore
//             this.state.count++;
//         }
//     ),
//     new Action(
//         'DECREASE',
//         function () {
//             // @ts-ignore
//             this.state.count--;
//         }
//     ),
// ];
//
// let view: View;
//
// if (root) {
//     view = new Flux.View(root, store, Counter, actions);
//     store.subscribe(view).setResponses(callbacks);
//     dispatcher.register(store);
// }





