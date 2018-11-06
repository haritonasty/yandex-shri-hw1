import Flux from "../../flux/index";
import ContentStructure from "./contentStructure";
import {template} from "./contentFunctions/template";
type CallbackFunction = () => void;

const eventsTempl: string = `
<div class="main-wrapper">
            <h1 class="main-title">Лента событий</h1>
            <div class="events"></div>
        </div>
`;


const contentEvents: ContentStructure = {
    page: 'События',
    template: eventsTempl,
    functions: () => {
        template();
    }
};




export {contentEvents};