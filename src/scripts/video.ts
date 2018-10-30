import hlsJs  from 'hls.js';

export function video() {
  const setOfCameras: Camera[] = [];
  const button: HTMLButtonElement | null = document.querySelector('.camera-button');
  const brightness: HTMLInputElement | null = document.querySelector('.brightness');
  const contrast: HTMLInputElement | null = document.querySelector('.contrast');
  const initializer: HTMLButtonElement | null = document.querySelector('.help-initializer');
  const vol: HTMLDivElement | null = document.querySelector('.volume_active');
  const settings: HTMLDivElement | null = document.querySelector('.settings');

  interface IFilters {
    brightness: number;
    contrast: number;
  }

  interface IVolume {
    context: AudioContext;
    source: MediaElementAudioSourceNode;
    analyser: AnalyserNode;
  }

  class Camera {
    public video: HTMLVideoElement;
    public canvas: HTMLCanvasElement;
    public filters: IFilters;
    public cameraVolume: IVolume | null;
    public fullscreen: boolean;

    constructor(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
      this.video = video;
      this.canvas = canvas;
      this.filters = { brightness: 100, contrast: 100 };
      this.cameraVolume = null;
      this.fullscreen = false;
      const context = new AudioContext();
      const source = context.createMediaElementSource(this.video);
      const analyser = context.createAnalyser();
      analyser.smoothingTimeConstant = 0.9;
      analyser.fftSize = 32;
      source.connect(analyser);
      analyser.connect(context.destination);
      this.cameraVolume = { context, source, analyser };
    }

    toggleFullscreen(): void {
      this.canvas.classList.toggle('fullscreen');
      this.video.muted = !this.video.muted;
      this.fullscreen = !this.fullscreen;
      if (button) button.classList.toggle('camera-button_hidden');
      if (settings) settings.classList.toggle('settings-hidden');
    }
  }

  const initVideo = (video: HTMLVideoElement | null,
                     canvas: HTMLCanvasElement | null,
                     url: string): void => {
    let camera: Camera;
    let ctx: CanvasRenderingContext2D | null;
    if (video && canvas) {
      if (hlsJs.isSupported()) {
        const hls = new hlsJs();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(hlsJs.Events.MANIFEST_PARSED, () => {
          video.play()
                  .then(goPlay)
                  .catch(tryPlay);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          video.play()
                  .then(goPlay)
                  .catch(tryPlay);
        });
      }
    }
    const goPlay = () => {
      if (video && canvas) {
        if (!video.paused) {
          video.classList.add('visually-hidden');
          if (initializer) initializer.classList.add('hidden');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx = canvas.getContext('2d');
          camera = new Camera(video, canvas);
          setOfCameras.push(camera);
          camera.canvas.addEventListener('click', canvasChecker);
          loop();
        }
      }
    };
    const tryPlay = () => {
      if (initializer) initializer.classList.remove('hidden');
      initVideo(video, canvas, url);
    };
    const loop = () => {
      if (ctx) {
        if (camera.fullscreen) {
          ctx.filter =
                  `brightness(${camera.filters.brightness}%) contrast(${camera.filters.contrast}%)`;
        }
        ctx.drawImage(camera.video, 0, 0, camera.canvas.width, camera.canvas.height);
        requestAnimationFrame(loop);
      }
    };
  };
  const canvasChecker = (e: Event) => {
    const activeCamera: Camera | undefined = setOfCameras.find((item: Camera) => item.fullscreen);
    if (activeCamera) {
      activeCamera.toggleFullscreen();
      activeCamera.canvas.style.zIndex = '1';
      if (activeCamera.canvas === e.target) return;
    }
    const currentCamera: Camera | undefined = setOfCameras
            .find((item: Camera) => item.canvas === e.target);
    if (currentCamera) {
      currentCamera.canvas.style.zIndex = '5';
      currentCamera.toggleFullscreen();
      if (brightness && contrast) {
        contrast.value = (currentCamera.filters.contrast).toString();
        brightness.value = (currentCamera.filters.brightness).toString();
      }
      if (currentCamera.cameraVolume) {
        currentCamera.cameraVolume.context.resume().then(() => {
          equalize(currentCamera);
        });
      }
    }
  };
  const applyFilter = (type: string, value: number): void => {
    const activeCamera: Camera | undefined = setOfCameras.find((item: Camera) => item.fullscreen);
    if (activeCamera) {
      if (type === 'brightness') {
        activeCamera.filters.brightness = value;
      }
      if (type === 'contrast') {
        activeCamera.filters.contrast = value;
      }
    }
  };
  const returnFromFullscreen = (): void => {
    const activeCamera: Camera | undefined = setOfCameras.find((item: Camera) => item.fullscreen);
    if (activeCamera) {
      activeCamera.toggleFullscreen();
      activeCamera.canvas.style.zIndex = '1';
    }
    if (button) button.classList.add('camera-button_hidden');
  };

  function equalize(camera: Camera) {
    function draw(): void {
      if (camera.cameraVolume) {
        const array = new Uint8Array(camera.cameraVolume.analyser.fftSize);
        camera.cameraVolume.analyser.getByteTimeDomainData(array);
        let average: number = 0;
        for (let i = 0; i < array.length; i += 1) {
          average += Math.abs(array[i] - 128);
        }
        average /= array.length;
        if (vol) vol.style.width = `${average * 1000 / 200}%`;
      }
      if (camera.fullscreen) {
        requestAnimationFrame(draw);
      }
    }

    draw();
  }

  const urls: string[] = [
    'http://live-bumtv.cdnvideo.ru/bumtv-live/smil:bumtv.smil/chunklist_b4192000.m3u8',
    'http://highvolume03.streampartner.nl:1935/vleugels_hd4/livestream/playlist.m3u8',
    'http://193.124.177.175:8081/live-x/t2x2/playlist.m3u8',
    'http://hls-edge.cdn.buy-home.tv/bhtvlive/_definst_/live/playlist.m3u8',
  ];
  for (let i = 0; i < 4; i += 1) {
    initVideo(
            document.querySelector(`.video-${i + 1}`),
            document.querySelector(`.canvas-${i + 1}`),
            urls[i],
    );
  }
}
