import Flux from "../../../src/scripts/flux/index";
import ContentStructure from "./contentStructure";
type CallbackFunction = () => void;

const testTempl: string = `
<div>Second page</div>
`;


const contentTest: ContentStructure = {
    page: 'Видеонаблюдение',
    template: testTempl,
};


export {contentTest};