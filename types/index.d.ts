import {DefineComponent} from 'vue'

declare module '@cycjimmy/vue-h5-audio-controls' {
  interface Methods {
    play(): void;

    pause(): void;

    stop(): void;

    changeButtonUI(): void;

    isPlaying(): boolean;
  }

  const H5AudioControls: DefineComponent<{
    src: string;
    position: string;
    positionType: string;
    buttonSize: string;
    iconSize: string;
    playIcon: string;
    pauseIcon: string;
    autoPlay: boolean;
  }, {}, Methods>;

  export default H5AudioControls;
}
