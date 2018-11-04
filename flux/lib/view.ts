type CallbackFunction = () => void;

interface IView {
    update(state?: object): this
}

abstract class View implements IView {
    protected node: HTMLElement;
    protected template: string;
    protected actions?: Map<string, CallbackFunction>;

    constructor(node: HTMLElement | null, temp: string, actions?: Map<string, CallbackFunction>) {
        if (node === null) throw new Error("Error with mounting in DOM. DOMNode wasn't found.");
        this.node = node;
        this.template = temp;
        if (actions) {
            this.actions = actions;
        }
    }

    abstract update(state?: object): this;

    protected initActions(el: HTMLElement): void {
        const events: NodeListOf<HTMLElement> | null = el.querySelectorAll('[data-event]');
        if (events) {
            const eventsArray: Array<HTMLElement> = Array.from(events);
            eventsArray.forEach((eventNode: HTMLElement) => {
                const event: string | null = eventNode.getAttribute('data-event');
                if (event) {
                    const eventData: Array<string> = event.split('=');
                    const eventType = eventData[0];
                    const eventAction: CallbackFunction | undefined = (this.actions as any).get(eventData[1]);
                    if (eventAction) {
                        eventNode.addEventListener(eventType, eventAction);
                    }
                }
            })
        }
    }

    protected templater(template: string, data: any): string {
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


    // update(): void {
    //     this.node.innerHTML = this.templater(this.template, this.getData());
    //     this.initActions(this.node);
    // }


}

export {IView, View};