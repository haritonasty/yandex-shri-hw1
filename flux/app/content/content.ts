import Flux from "../../lib/index";
import {contentCounter} from "./counter";
import {contentTest} from "./test";
import ContentStructure from "./contentStructure";

type CallbackFunction = () => void;

const pagesContent: Array<ContentStructure> = [contentCounter, contentTest];


class ContentView extends Flux.View {
    constructor(node: HTMLElement | null, template: string, actions?: Map<string, CallbackFunction>) {
        super(node, template, actions);
    }

    update(state: object): this {

        // @ts-ignore
        const activePage = pagesContent.find(item => item.page === state.activePage);
        if (activePage) {
            this.node.innerHTML = this.templater(activePage.template, state);
            this.actions = activePage.actions;
            this.initActions(this.node);
        }
        return this;
    };
}


export {ContentView, pagesContent};
