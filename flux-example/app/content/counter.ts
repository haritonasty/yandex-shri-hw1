import Flux from "../../../src/scripts/flux/index";
import ContentStructure from "./contentStructure";
type CallbackFunction = () => void;

const counterTempl: string = `
<button data-event="click=dec" class="button button_type_inc">-</button>
    <span class="label">{{count}}</span>
<button data-event="click=inc" class="button button_type_dec">+</button>
`;




const counterActions = new Map()
    .set('inc', () => Flux.Dispatcher.dispatch(new Flux.Action('INCREASE')))
    .set('dec', () => Flux.Dispatcher.dispatch(new Flux.Action('DECREASE')));



// class CounterView extends Flux.View {
//     constructor(node: HTMLElement | null, template: string, actions?: Map<string, CallbackFunction>) {
//         super(node, template, actions);
//     }
//
//     update(state: object): this {
//         this.node.innerHTML = this.templater(this.template, state);
//         this.initActions(this.node);
//         return this;
//     };
// }

const counterCallbacks = new Map()
    .set('INCREASE', function () {
        // @ts-ignore
        this.state.count++;
    })
    .set('DECREASE', function () {
        // @ts-ignore
        this.state.count--;
    });




const contentCounter: ContentStructure = {
    page: 'Сводка',
    template: counterTempl,
    actions: counterActions,
    callbacks: counterCallbacks
};


// export {counterTempl, counterActions, counterCallbacks, CounterView};
export {contentCounter};