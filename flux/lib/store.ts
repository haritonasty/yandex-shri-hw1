import {IAction} from "./action";
import {IView} from "./view";

type CallbackFunction = () => void;

interface IStore {
    getState(): object,
    setState(state: object): void,
    subscribe(view: IView): this,
    checkAction(action: IAction): void,
    setResponses(responses: Map<string, CallbackFunction>): this
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
        this.observers.forEach(view => view.update(this.state));
    }

    checkAction(action: IAction): void {
        if (this.responses.has(action.type)) {
            const cb = this.responses.get(action.type);
            if (cb) {
                cb(action.data);
                this.change();
            }
        }
    }

    setResponses(responses: Map<string, CallbackFunction>): this {
        responses.forEach((value, key) => {
            if (value) this.responses.set(key, value.bind(this));
        });
        return this;
    }

}

export {IStore, Store};