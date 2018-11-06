interface IAction {
    type: string,
    data?: any
}

class Action implements IAction {
    public type: string;
    public data?: any;

    constructor(type: string, data?: any) {
        this.type = type;
        this.data = data;
    }
}

export {IAction, Action};
