import {IAction} from "./action";
import {IView} from "./view";

interface IStore {
    getState(): object,
    setState(state: object): void,
    subscribe(view: IView): this,
    checkAction(action: IAction): void,
    setResponses(responses: Array<IAction>): this
}

class Store implements IStore {
    private observers: Array<IView>;
    private state: object;
    private responses: Map<string, Function | null>;

    constructor(state = {}, observers = []) {
        this.observers = observers;
        this.state = state;
        this.responses = new Map();
    }

    getState(): object {
        return this.state;
    }

    setState(state: object): void {
        this.state = state;
    }

    subscribe(view: IView): this {
        this.observers.push(view);
        return this;
    }

    private change(): void {
        this.observers.forEach(view => view.update());
    }

    checkAction(action: IAction): void {
        if (this.responses.has(action.type)) {
            const payload = this.responses.get(action.type);
            if (payload) {
                payload(action.payload);
                this.change();
            }
        }
    }

    setResponses(responses: Array<IAction>): this {
        responses.forEach(action => {
            if (action.payload) this.responses.set(action.type, action.payload.bind(this));
        });
        return this;
    }

}

export {IStore, Store};