import ContentStructure from "./contentStructure";
const scenariosTempl: string = `
<div class="main-wrapper">
            <h1 class="main-title">Сценарии УмногоДома</h1>
            <p class="events">Пока здесь пусто.</p>
        </div>
`;


const contentScenarios: ContentStructure = {
    page: 'Сценарии',
    template: scenariosTempl,
    functions: () => {}
};


export {contentScenarios};