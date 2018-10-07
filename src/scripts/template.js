const container = document.querySelector('.events');


let template = `
    <div class="event {{ type }} {{ size }}">
        <div class="event__close event-control event-control_disabled">
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.061 7l4.72-4.719a.75.75 0 1 0-1.062-1.061L7 5.939l-4.719-4.72A.75.75 0 1 0 1.22 2.282l4.719 4.72-4.72 4.718a.75.75 0 1 0 1.062 1.061l4.72-4.719 4.718 4.72a.748.748 0 0 0 1.061 0 .75.75 0 0 0 0-1.062L8.061 7z"/>
            </svg>
        </div>
        <div class="event__open event-control event-control_disabled">
            <svg width="10" height="16" xmlns="http://www.w3.org/2000/svg" fill="#666" stroke="#666">
                <path d="M8.266 8.691L2.24 14.715a.98.98 0 1 1-1.387-1.387l5.33-5.33-5.33-5.33A.981.981 0 0 1 2.24 1.28l6.025 6.024a.978.978 0 0 1 0 1.387z"/>
            </svg>
        </div>
        <div class="event__main-info">
            <svg class="{{ event__icon }}">
                <use class="event__icon_source" xlink:href="#{{ icon }}"/>
            </svg>
            <span class="{{ event__title }}">{{ title }}</span>
        </div>
        <div class="event__info">
            <span class="event__source">{{ source }}</span>
            <span class="event__time">{{ time }}</span>
        </div>
        <div class="additional-info additional-info_disabled">
            <span class="event__description">{{ description }}</span>
            {{data}}
        </div>
        
    </div>
`;

let eventsStr = '';


fetch('./events.json')
    .then(res => res.json())
    .then(data => {
        const events = data.events;
        for (let e in events) {
            let event = templater(template, events[e]);
            eventsStr += event;
        }
        container.innerHTML = eventsStr;
    });


function isTouchDevice() {
    return (
        !!(typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
                (window.DocumentTouch &&
                    typeof document !== 'undefined' &&
                    document instanceof window.DocumentTouch))) ||
        !!(typeof navigator !== 'undefined' &&
            (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
    );
}


function templater(html, data) {
    for (let x in data) {
        let value = data[x];
        if (x === 'type') {
            if (data[x] === 'critical') {
                value = 'event-critical';
                html = html.replace(new RegExp('{{ event__icon }}', 'ig'), 'event__icon event__icon_critical');
                html = html.replace(new RegExp('event__close', 'ig'), 'event__close event__close_white');
                html = html.replace(new RegExp('{{ event__title }}', 'ig'), 'event__title event__title_critical');
            }
            html = html.replace(new RegExp('{{ event__icon }}', 'ig'), 'event__icon');
            html = html.replace(new RegExp('{{ event__title }}', 'ig'), 'event__title');
        }
        if (x === 'size') {
            value = data[x] === 'l' ? 'event-big' : data[x] === 'm' ? 'event-middle' : '';
        }

        if (x === 'description' && data[x]) {
            html = html.replace(new RegExp('additional-info_disabled', 'ig'), '');
        }

        if (x === 'description' && !data['data']) {
            html = html.replace(new RegExp('{{\\s?' + 'data' + '\\s?}}', 'ig'), '');
        }

        if (x === 'data') {
            if (data['icon'] === 'thermal') {
                value = `
                    <div class="event__data">
                 <div class="data__climate">
                        <div><span class="climate__type">Температура: </span><span class="climate__value">24 С</span></div>
                        <div><span class="climate__type">Влажность: </span><span class="climate__value">80%</span></div>
                    </div>
                    </div>
                `;
            }

            if (data['icon'] === 'fridge') {
                value = `
                 <div class="event__data">
                 <div class="data__buttons">
                        <button class="data__button">Да</button>
                        <button class="data__button">Нет</button>
                    </div>
                    </div>
                `;
            }

            if (data['icon'] === 'music') {
                value = `
                    <div class="event__data">
                    <div class="data__music">
                        <div class="data__music_composition">
                            <img src="./album-cover.png" alt="Обложка альбома" class="data__music_image">
                            <div>
                                <span class="data__music_composition-title">Florence & The Machine - Big God</span>
                                <div class="data__music_composition-range">
                                    <input type="range" min="0" max="271" value="70" class="data__music_composition-range_input">
                                    <span class="data__music_composition-duration">4:31</span>
                                </div>
                            </div>
                        </div>
                        <div class="data__music_composition-controls">
                            <div>
                                <svg class="music__icon music__icon_prev">
                                    <use xlink:href='#music-control'></use>
                                </svg>
                                <svg class="music__icon music__icon_next">
                                    <use xlink:href='#music-control'></use>
                                </svg>
                            </div>
                            <input type="range" min="0" max="100" value="80" class="data__music_composition-volume">
                            <span class="data__music_composition-duration">80%</span>
                        </div>
                    </div>
                </div>
                `;
            }

            if (data['icon'] === 'cam') {
                if (isTouchDevice()) {
                    value = `
<div class="event__data">
                 <div class="data__image">
                        <picture>
                        <sourse media="(max-width:415px)" srcset="cam.jpg">
                        <img srcset="cam.png,
                                     cam2x.png 2x,
                                     cam3x.png 3x"
                             src="cam.png" alt="Снимок камеры с пылесосом">
                        </picture>
                    </div>
                    <div class="event__touch-info">
                        <div><span class="touch-info_zoom">Приближение: </span><span class="touch-info__value zoom__value">78%</span></div>
                        <div><span class="touch-info_brightness">Яркость: </span><span class="touch-info__value brightness__value">50%</span></div>
                    </div>
                    </div>
                `;
                } else {
                    value = `
<div class="event__data">
                 <div class="data__image">
                        <picture>
                        <sourse media="(max-width:415px)" srcset="cam.jpg">
                        <img srcset="cam.png,
                                     cam2x.png 2x,
                                     cam3x.png 3x"
                             src="cam.png" alt="Снимок камеры с пылесосом">
                        </picture>
                    </div></div>`;
                }
            }

            if (data['icon'] === 'stats') {
                value = `
<div class="event__data">
                 <div class="data__image">
                        <img src="./Richdata.svg" alt="График">
                    </div>
                    </div>
                `;
            }
        }

        let re = '{{\\s?' + x + '\\s?}}';
        html = html.replace(new RegExp(re, 'ig'), value);

    }
    return html;
}


