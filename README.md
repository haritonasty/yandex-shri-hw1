Проект запускаю на node 8.11.4

```
npm i
npm run dev
```

### HW-Flux
- Для запуска  - `npm run dev`

#### Описание библиотеки

Flux состоит из трех частей:
- Dispatcher
- Store
- View

##### 1. Dispatcher API

Умеет:
 - регестрировать в себе store - `dispatcher.register(store: IStore)`
 - отправлять объект с действием подписанным store-ам `Flux.Dispatcher.dispatch(action: IAction)`
 - логировать action-ы (происходит автоматически при вызове метода dispatch)
 
 Экземпляр Flux.Dispatcher создавать нет необходимости, так как уже создан Dispatcher-синглтон

##### 2. Store API

При создании store в конструктор передается начальный `state: object`
```javascript
const store = new Flux.Store(state: object);
```

Для подписки `view` на `store` используется метод `subscribe(view: IView)`:
```javascript
store.subscribe(view: IView);
```
Для добавление функций-обработок на action-ы используется метод `setResponses(Map<string, CallbackFunction>)`:
```javascript
store.setResponses(new Map().set('INCREASE', () => this.state.count++));
```

Предыдущие два метода для удобства можно использовать в виде chaining:
```javascript
store.subscribe(viewNav).setResponses(navCallbacks);
```

Получить `state` из `store` можно с помощью: 
```javascript
store.getState();
```
##### 3. View API

Чтобы создать свой View, нужно: 
 - отнаследоваться от абстрактного класса View
 - передать в конструктор своего класса два обязательных параметра и один необязательныйи вызвать с ними super:
 ```javascript
constructor(node: HTMLElement | null, template: string, actions?: Map<string, CallbackFunction>) {
        super(node, template, actions);
    }
```
 - Написать свою реализацию функции update(state: IState):
 ```javascript
    update(): this {
        this.node.innerHTML = this.template;
        return this;
    };

```
 - Если ваш `view` содержит `actions`, в update необходимо вызывать метод `this.initActions()`
 - В данном фреймворке action-ы срабатывают по handle-event-ам, которые необходимо проинициализировать в шаблоне, передаваемый в конструктор c помощью атрибута `data-event`:
 ```javascript
 <a href="#" data-event="click=changePage">События</a>
```
 
 #### Как используется в проекте
 
 - На интерфейс view переведен весь html приложения
 - Точка входа - `scripts/index.ts`. Все монтируется в элемент на странице с `id="root"`
 - В `store` хранится состояние активной страницы `{activePage: 'Сводка'}` 
 - `Action-ы` написаны только для главной навигации приложения
 - Библиотека `Flux` представлена в виде отдельного обьекта, не завязанного на мой проект
 - Данные `store` сохраняются в `localStorage`
 - Приложение поделено на блоки: `navigation`, `footer`, `content`.
 - Блок `content` и `navigation` перерисовываются только тогда, когда активная страница изменяется. `footer` не перерисовывается.
 - `actions-ы` логируются в консоли.
 - [Посмотреть Демо](https://haritonasty.github.io/yandex-shri-smarthome/docs/)
 
---
### HW-Typescript

- Для запуска первых трех ДЗ (верстка, сенсор, мультимедиа) - `npm run dev`
- Проект собирается с помощью gulp, typescript-компиляция добавлена с помощью пакета `gulp-typescript`
---
- Для запуска серверной части - `npm run start`. 
- Код серверной части находится в папке `app`.
- Код компилируется в `.js` с помощью `npm run compile`
---
#### Техническое задание первых 4-ех ДЗ

- `1` [макет](https://shri-msk-2018-reviewer.github.io/shri-18-smarthouse-task-1/)
Нужно сверстать страницу ленты событий умного дома.
Предоставляется базовый дизайн ленты для экрана. 
Изменения размеров и компоновки карточек на других размерах экрана необходимо придумать и реализовать самостоятельно. Верстка должна быть максимально адаптивной.

- `2` Оживить карточку с пылесосом с помощью pointer events. Реализовать zoom, rotate, move

- `3` Страница-вкладка в интерфейсе умного дома "Видеонаблюдение":
1. Сетка из 4-ёх видео-превью. Клик по превью разворачивает соответствующее видео на всю страницу.
2. Видео-поток с камеры может быть плохого качества (размытый, засвеченный или затемненный) - на экрану просмотра видео должна есть `возможность регулировать его яркость и контрастность`.
3. Там же - анализатор громкости звука в потоке из открытой камеры.

- `4` сервер на express на 8000 порту обрабатывает два роута: 
1. /status — должен выдавать время, прошедшее с запуска сервера в формате hh:mm:ss 
2. /api/events — должен отдавать содержимое файла events.json. При передаче get-параметра type включается фильтрация по типам событий. При передаче некорректного type — отдавать статус 400 "incorrect type". (/api/events?type=info:critical) Все остальные роуты должны отдавать `<h1>Page not found</h1>`, с корректным статусом 404.
3. Пагинация событий — придумать и реализовать API, позволяющее выводить события постранично. (offset & limit)
4. Подключить данные к вёрстке из первого задания.
