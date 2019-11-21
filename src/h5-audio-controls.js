import h5AudioControls from '@cycjimmy/h5-audio-controls';

export default {
  name: 'h5-audio-controls',
  template: ``,
  data() {
    return {};
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
  render() {},
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
  mounted() {
    const { parentNode } = this.$el;
    this.h5AudioControls = h5AudioControls(this.src, {
      context: parentNode,
      position: this.position,
      buttonSize: this.buttonSize,
      iconSize: this.iconSize,
      playIcon: this.playIcon,
      pauseIcon: this.pauseIcon,
      autoPlay: this.autoPlay
    });

    this.h5AudioControls.setContext(parentNode).load();
  }
};
