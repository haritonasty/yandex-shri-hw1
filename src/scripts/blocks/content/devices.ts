import ContentStructure from "./contentStructure";
const devicesTempl: string = `
<div class="main-wrapper">
            <h1 class="main-title">Устройства УмногоДома</h1>
            <p class="events">Пока здесь пусто.</p>
        </div>
`;


const contentDevices: ContentStructure = {
    page: 'Устройства',
    template: devicesTempl,
    functions: () => {}
};


export {contentDevices};