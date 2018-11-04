import Flux from "./lib/index";

const dispatcher = new Flux.Dispatcher();
const store = new Flux.Store({count: 5});
const initState: object = store.getState();

const Counter: string = `
<button data-event="click=dec" class="button button_type_inc">-</button>
    <span class="label" data-deps="count">{{count}}</span>
<button data-event="click=inc" class="button button_type_dec">+</button>
`;

const root = document.querySelector<HTMLElement>('#root');

const actions = new Map()
    .set('inc', () => dispatcher.dispatch(new Flux.Action('INCREASE')))
    .set('dec', () => dispatcher.dispatch(new Flux.Action('DECREASE')));


class CounterView extends Flux.View {
    constructor() {
        super(root, Counter, initState, actions);
    }

    update(state: object) {
        this.node.innerHTML = this.templater(this.template, state);
        this.initActions(this.node);
    };
}

const callbacks = new Map()
    .set('INCREASE', function () {
            // @ts-ignore
            this.state.count++;
        })
    .set('DECREASE', function () {
            // @ts-ignore
            this.state.count--;
        });

const view = new CounterView();

store.subscribe(view).setResponses(callbacks);
dispatcher.register(store);


