import ContentStructure from "./contentStructure";
import {videoLogic} from "./contentFunctions/video";
const videoTempl: string = `
 <div class="main-wrapper main-wrapper_video">
            <h1 class="main-title logger">Видеонаблюдение</h1>
        </div>

        <div class="cameras">
            <button class="help-initializer hidden video-button">Запустить</button>
            <button class="camera-button video-button camera-button_hidden">Все камеры
            </button>
            <video class="video video-1 " muted autoplay></video>
            <canvas class="canvas canvas-1"></canvas>
            <video class="video video-2 " muted autoplay></video>
            <canvas class="canvas canvas-2"></canvas>
            <video class="video video-3 " muted autoplay></video>
            <canvas class="canvas canvas-3"></canvas>
            <video class="video video-4 " muted autoplay></video>
            <canvas class="canvas canvas-4"></canvas>

        </div>
        <div class="settings settings-hidden">

            <div class="regulator regulator_contrast">
                <p>Контрастность:</p>
                <input type="range" title="indicator" min="0" max="200" value="100"
                       class="regulator__value_current contrast">
            </div>
            <div class="regulator regulator_brightness">
                <p>Яркость:</p>
                <input type="range" title="indicator" min="0" max="200" value="100"
                       class="regulator__value_current brightness">
            </div>
            <div>
                <p>Громкость:</p>
                <div class="regulator regulator_volume">
                    <div class="regulator__range volume_active"></div>
                </div>
            </div>
        </div>
`;


const contentVideo: ContentStructure = {
    page: 'Видеонаблюдение',
    template: videoTempl,
    functions: videoLogic
};


export {contentVideo};