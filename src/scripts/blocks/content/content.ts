import Flux from "../../flux/index";
import ContentStructure from "./contentStructure";
import {contentDevices} from "./devices";
import {contentEvents} from "./events";
import {contentScenarios} from "./scenarios";
import {contentSvodka} from "./svodka";
import {contentVideo} from "./video";

type CallbackFunction = () => void;

const pagesContent: Array<ContentStructure> = [contentDevices, contentEvents, contentScenarios, contentSvodka, contentVideo];


class ContentView extends Flux.View {
    private currPage: string;

    constructor(node: HTMLElement | null, template: string, actions?: Map<string, CallbackFunction>) {
        super(node, template, actions);
        this.node.innerHTML = this.template;
        this.currPage = '';
    }

    update(state: object): this {
        // @ts-ignore
        if (this.currPage !== state.activePage) {

            // @ts-ignore
            const activePage = pagesContent.find(item => item.page === state.activePage);
            if (activePage) {
                this.actions = activePage.actions;
                this.node.innerHTML = activePage.template;
                activePage.functions();
                this.initActions(this.node);
            }
            // @ts-ignore
            this.currPage = state.activePage;

        }
        return this;
    };
}


export {ContentView, pagesContent};
