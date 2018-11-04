type CallbackFunction = () => void;

interface IAction {
    type: string,
    payload: CallbackFunction | null
}

class Action implements IAction {
    public type: string;
    public payload: CallbackFunction | null;

    constructor(type: string, payload: CallbackFunction | null = null) {
        this.type = type;
        this.payload = payload;
    }
}

export {IAction, Action};
