import { defineComponent, onMounted, ref, watch } from 'vue'
// @ts-ignore
import h5AudioControls from '@cycjimmy/h5-audio-controls'

export default defineComponent({
  props: {
    src: String,
    position: String,
    positionType: String,
    buttonSize: [String, Number],
    iconSize: [String, Number],
    playIcon: String,
    pauseIcon: String,
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const wrapperRef = ref(null)
    const h5AudioControlsIns = ref()

    watch(
      () => props.src,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.changeAudioSrc(val)
        }
      }
    )

    watch(
      () => props.position,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.changePosition(val)
        }
      }
    )

    watch(
      () => props.buttonSize,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.changeButtonSize(val)
        }
      }
    )

    watch(
      () => props.iconSize,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.changeIconSize(val)
        }
      }
    )

    watch(
      () => props.playIcon,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.change('playIcon', val)
        }
      }
    )

    watch(
      () => props.playIcon,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.change('playIcon', val)
        }
      }
    )

    watch(
      () => props.playIcon,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.change('playIcon', val)
        }
      }
    )

    watch(
      () => props.pauseIcon,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.change('pauseIcon', val)
        }
      }
    )

    watch(
      () => props.autoPlay,
      (val) => {
        if (h5AudioControlsIns.value) {
          h5AudioControlsIns.value.change('autoPlay', val)
        }
      }
    )

    onMounted(() => {
      h5AudioControlsIns.value = h5AudioControls(props.src, {
        context: wrapperRef.value,
        position: props.position,
        positionType: props.positionType,
        buttonSize: props.buttonSize,
        iconSize: props.iconSize,
        playIcon: props.playIcon,
        pauseIcon: props.pauseIcon,
        autoPlay: props.autoPlay
      })
      if (h5AudioControlsIns.value) {
        h5AudioControlsIns.value.load()
      }
    })

    const play = () => {
      if (h5AudioControlsIns.value) {
        h5AudioControlsIns.value.play()
      }
    }

    const pause = () => {
      if (h5AudioControlsIns.value) {
        h5AudioControlsIns.value.pause()
      }
    }

    const stop = () => {
      if (h5AudioControlsIns.value) {
        h5AudioControlsIns.value.stop()
      }
    }

    const changeButtonUI = () => {
      if (h5AudioControlsIns.value) {
        h5AudioControlsIns.value.changeButtonUI()
      }
    }

    const isPlaying = () => {
      if (!h5AudioControlsIns.value) {
        return false
      }
      return h5AudioControlsIns.value.isPlaying()
    }

    return {
      wrapperRef,
      play,
      pause,
      stop,
      changeButtonUI,
      isPlaying
    }
  }
})
