import h5AudioControls from '@cycjimmy/h5-audio-controls';

export default {
  name: 'h5-audio-controls',
  template: `<div :style="containerStyle"></div>`,
  data() {
    return {
      containerStyle: {
        position: 'absolute',
        zIndex: 999,
        width: 0,
        height: 0
      }
    };
  },
  props: {
    src: String,
    position: String,
    buttonSize: [String, Number],
    iconSize: [String, Number],
    playIcon: String,
    pauseIcon: String,
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    play() {
      this.h5AudioControls.play();
    },
    pause() {
      this.h5AudioControls.pause();
    },
    stop() {
      this.h5AudioControls.stop();
    },
    changeButtonUI() {
      this.h5AudioControls.changeButtonUI();
    },
    isPlaying() {
      return this.h5AudioControls.isPlaying();
    }
  },
  watch: {
    src(val) {
      this.h5AudioControls.changeAudioSrc(val);
    },
    position(val) {
      this.h5AudioControls.changePosition(val);
    },
    buttonSize(val) {
      this.h5AudioControls.changeButtonSize(val);
    },
    iconSize(val) {
      this.h5AudioControls.changeIconSize(val);
    },
    playIcon(val) {
      this.h5AudioControls.change('playIcon', val);
    },
    pauseIcon(val) {
      this.h5AudioControls.change('pauseIcon', val);
    },
    autoPlay(val) {
      this.h5AudioControls.change('autoPlay', val);
    }
  },
  mounted() {
    this.h5AudioControls = h5AudioControls(this.src, {
      context: this.$el,
      position: this.position,
      buttonSize: this.buttonSize,
      iconSize: this.iconSize,
      playIcon: this.playIcon,
      pauseIcon: this.pauseIcon,
      autoPlay: this.autoPlay
    });

    this.h5AudioControls.load();
  }
};
