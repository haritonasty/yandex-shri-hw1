import Flux from "../flux/index";


const rootTempl: string = `
    <header class="header page__header" id="header"></header>
    <main class="main main_events" id="content"></main>
    <footer class="footer page__footer" id="footer"></footer>
`;


class RootView extends Flux.View {
    constructor(node: HTMLElement | null, template: string) {
        super(node, template);
    }

    update(): this {
        this.node.innerHTML = this.template;
        return this;
    };
}

export {RootView, rootTempl };