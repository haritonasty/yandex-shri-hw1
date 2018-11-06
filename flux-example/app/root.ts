import Flux from "../../src/scripts/flux/index";


const rootTempl: string = `
<div id="nav">Навигация</div>
<div id="content">Контент</div>
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