import {IAction} from "./action";
import {IView} from "./view";

type CallbackFunction = () => void;

interface IStore {
    getState(): object,

    subscribe(view: IView): this,

    checkAction(action: IAction): void,

    setResponses(responses: Map<string, CallbackFunction>): this
}

class Store implements IStore {
    private observers: Array<IView>;
    private state: object;
    private responses: Map<string, Function | null>;

    constructor(state = {}) {
        const savedState = localStorage.getItem("storeState");
        this.observers = [];
        this.state = savedState ? JSON.parse(savedState) : state;
        this.responses = new Map();
    }

    getState(): object {
        return this.state;
    }

    subscribe(view: IView): this {
        this.observers.push(view);
        return this;
    }

    private change(): void {
        console.log(this.state);
        this.observers.forEach(view => view.update(this.state));
    }

    checkAction(action: IAction): void {
        if (this.responses.has(action.type)) {
            const cb = this.responses.get(action.type);
            if (cb) {
                cb(action.data);
                localStorage.setItem("storeState", JSON.stringify(this.state));
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