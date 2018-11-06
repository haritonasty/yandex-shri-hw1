### [Адаптивная верстка страницы событий УмногоДома 🤖](https://haritonasty.github.io/yandex-shri-smarthome/)

Проект запускаю на node 8.11.4

```
npm i
npm run dev
```

### HW-Flux

Описание обновлю чуть позже


### HW-Typescript

- Для запуска первых трех ДЗ (верстка, сенсор, мультимедиа) - `npm run dev`
- Проект собирается с помощью gulp, typescript-компиляция добавлена с помощью пакета `gulp-typescript`
---
- Для запуска серверной части - `npm run start`. 
- Код серверной части находится в папке `app`.
- Код компилируется в `.js` с помощью `npm run compile`
---
#####  В отчете отразить
 1. Трудоёмкость перевода проекта на TypeScript. Самые сложные моменты в работе:
 - Дольше всего я соображала, как заставить все это работать в браузере. С `sourcemap` для ts так и не вышло. 
 - Пару раз не удалось избежать ts-lint:disable правил для ограничения длины строки (`index.ts`) и `no-parameter-reassignment` там же из-за изначально сильно кривого кода
 - Надо бы добавить в проверках на null `throw new error` для удобного дебага. 
 
 2. Какие в процессе перевода были найдены ошибки:
 - Не совсем верная логика в типах для фильтров на видео (`video.ts`)
 
 3. Решили ли вы вливать данный PR, или предпочитаете работать с JavaScript? Почему?
 - Да, волью. Нужно расти, разбираться в новом. Тем более, что Typescript-код читабельнее, чем js. 
 - Вроде домашки делала не так давно, но сотря на код уже подзабываешь что где. А смотришь на описание ts-функции и сразу понятно что где. 





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

#### HW3 (Мультимедиа)

Страница "Видеонаблюдение" работает в актуальной версии Chrome на десктопе и на Android 
(по заданию достаточно одной мобильной платформы)

Реализованы:
- сетка из 4-ёх видео-превью, анимация разворачивания
- фильтры для видео
- анализатор звука    

#### HW2 (Работа с пользовательским сенсорным вводом)

- сделала move по горизонтали с ограничением по контейнеру, по вертикали так же не получилось, я примерно понимаю, что это из-за скролла страницы меняются нужные мне размеры, но не смогла нащупать не костыльное решение проблемы улетания картинки 
- сделала pinch
- сделала rotate
- проверяла на android


#### HW1 (Адаптивная верстка)
- fliud typography использовала для events
- попробовала адаптивные картинки
- сделала templater (поле data захардкодила)
- минифицировала растровые изображения и векторные иконки
- проверяла на touch-десктопе и android
