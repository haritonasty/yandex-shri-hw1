import Flux from "./lib/index";
import {rootTempl, RootView} from "./app/root";
import {counterCallbacks, CounterView, counterActions, counterTempl} from "./app/counter";


const store = new Flux.Store({count: 5});
const initState: object = store.getState();


const viewRoot = new RootView(document.getElementById('root'), rootTempl).update();
const viewCounter = new CounterView(document.getElementById('counter'),counterTempl, counterActions).update(initState);
store.subscribe(viewCounter).setResponses(counterCallbacks);


Flux.Dispatcher.register(store);


