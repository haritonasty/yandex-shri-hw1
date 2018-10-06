const container = document.querySelector('.events');

fetch('./events.json')
    .then(res => res.json())
    .then(data => {
        const events = data.events;
        for (let e in events) {

            const event = document.getElementById('template-event').content.cloneNode(true);
            if (events[e].size === 'm') {
                event.querySelector('.event').classList.add('event-middle');
                event.querySelector('.event__source').classList.add('event-source_small');
            }
            if (events[e].size === 'l') {
                event.querySelector('.event').classList.add('event-big');
                event.querySelector('.event__source').classList.add('event-source_small');
                event.querySelector('.event__description').classList.add('event__description_big');
            }

            if (events[e].type === 'critical') {
                event.querySelector('.event').classList.add('event-critical');
                event.querySelector('.event__icon').classList.add('event__icon_critical');
                event.querySelector('.event__title').classList.add('event__title_critical');
                event.querySelector('.event').classList.add('event-critical');
            }

            event.querySelector('.event__title').innerText = events[e].title;
            event.querySelector('.event__source').innerText = events[e].source;
            event.querySelector('.event__time').innerText = events[e].time;
            event.querySelector('.event__icon_source').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${events[e].icon}`);

            if (events[e].description) {
                event.querySelector('.additional-info').classList.remove('additional-info_disabled');
                event.querySelector('.event__description').innerText = events[e].description;
            }

            if (events[e].icon === 'thermal') {
                event.querySelector('.event__data').innerHTML = `
                 <div class="data__climate">
                        <span class="climate__type">Температура: </span><span class="climate__value">24 С</span>
                        <span class="climate__type">Влажность: </span><span class="climate__value">80%</span>
                    </div>
                `;
            }

            if (events[e].icon === 'fridge') {
                event.querySelector('.event__data').innerHTML = `
                 <div class="data__buttons">
                        <button class="data__button">Да</button>
                        <button class="data__button">Нет</button>
                    </div>
                `;
            }

            if (events[e].icon === 'music') {
                event.querySelector('.event__data').innerHTML = `
                    <div class="data__music">
                        <!--<div class="data__music_image">-->
                        <!--</div>-->
                        <div class="data__music_composition">
                            <img src="./album-cover.png" alt="Обложка альбома">
                            <span class="data__music_composition-title">Florence & The Machine - Big God</span>
                            <input type="range" min="0" max="271" value="70">
                            <span class="data__music_composition-duration">4:31</span>
                        </div>
                        <div class="data__music_composition-controls">
                            <svg class="music__icon music__icon_prev">
                                <use xlink:href='#music-control'></use>
                            </svg>
                            <svg class="music__icon music__icon_next">
                                <use xlink:href='#music-control'></use>
                            </svg>
                            <input type="range" min="0" max="100" value="80" class="data__music_composition-volume">
                            <span class="data__music_composition-duration">80%</span>
                        </div>
                    </div>
              
                `;
            }

            if (events[e].icon === 'cam') {
                event.querySelector('.event__data').innerHTML = `
                 <div class="data__image">
                        <img src="./image.jpg" alt="График">
                    </div>
                `;
            }

            if (events[e].icon === 'stats') {
                event.querySelector('.event__data').innerHTML = `
                 <div class="data__image">
                        <img src="./Richdata.svg" alt="График">
                    </div>
                `;
            }


            container.appendChild(event);
        }
    });