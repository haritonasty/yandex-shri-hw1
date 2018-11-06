import ContentStructure from "./contentStructure";
const svodkaTempl: string = `
<div class="main-wrapper">
            <h1 class="main-title">Последние новости</h1>
            <p class="events">Пока здесь пусто.</p>
        </div>
`;


const contentSvodka: ContentStructure = {
    page: 'Сводка',
    template: svodkaTempl,
    functions: () => {}
};


export {contentSvodka};