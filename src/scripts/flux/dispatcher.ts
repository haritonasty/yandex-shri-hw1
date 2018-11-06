import {Store} from "./store";
import {IAction} from "./action";

 class Dispatcher {
    private callbacks: Array<Function>;

    constructor() {
        this.callbacks = [];
    }

    register(store: Store) {
        this.callbacks.push(store.checkAction.bind(store));
    }

    dispatch(action: IAction) {
        this.callbacks.forEach(callback => callback(action));
        this.logger(action.type);
    }

    private logger(action: string) {
        console.log(`ACTION: ${action}`);
    }
}

export default new Dispatcher();