import {Store} from "./store";

type CallbackFunction = () => void;


interface IView {
    update(): void
}


class View implements IView {
    private node: HTMLElement;
    private template: string;
    private actions?: Map<string, CallbackFunction>;
    private store?: Store;
    private lastState?: object;
    private nodes: Array<object>;

    constructor(node: HTMLElement, temp: string, store?: Store, actions?: Map<string, CallbackFunction>) {
        this.node = node;
        this.nodes = [];
        this.template = temp;
        if (store) {
            this.store = store;
            this.actions = actions;
            this.lastState = this.getData();
            this.node.innerHTML = this.templater(this.template, this.lastState);
            this.initActions(this.node);
        } else {
            this.node.innerHTML = this.template;
        }

    }

    private getData(): object {
        if (this.store) return this.store.getState();
        else return {};
    }

    private initActions(el: HTMLElement): void {
        const events: NodeListOf<HTMLElement> | null = el.querySelectorAll('[data-event]');
        if (events) {
            const eventsArray: Array<HTMLElement> = Array.from(events);
            eventsArray.forEach((eventNode: HTMLElement) => {
                const event: string | null = eventNode.getAttribute('data-event');
                if (event && this.actions) {
                    const eventData: Array<string> = event.split('=');
                    const eventType = eventData[0];
                    const eventAction: CallbackFunction | undefined = this.actions.get(eventData[1]);
                    if (eventAction) {
                        eventNode.addEventListener(eventType, eventAction);
                    }
                }
            })
        }
    }


    update(): void {
        const newState: object = this.getData();

        this.node.innerHTML = this.templater(this.template, newState);
        this.initActions(this.node);
    }

    private templater(template: string, data: any): string {
        const matches: Array<string> | null = template.match(/{{.+?}}/g);
        let html = template;
        if (matches) {
            matches.forEach((str: string) => {
                str = str.replace('{{', '').replace('}}', '');
                if (data[str] !== undefined) {
                    html = html.replace('{{' + str + '}}', data[str]);
                }
            });
        }
        return html;
    }
}

export {IView, View};