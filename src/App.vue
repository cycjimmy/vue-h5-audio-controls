<template>
  <div class="wrapper">
    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="play">play</a>
      <a href="javascript:" class="button" @click="pause">pause</a>
      <a href="javascript:" class="button" @click="stop">stop</a>
      <a href="javascript:" class="button" @click="trigger">trigger</a>
    </div>

    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="changeAudioSrc">changeAudioSrc</a>
    </div>

    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="changePosition">changePosition</a>
    </div>

    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="changeButtonSize">changeButtonSize</a>
    </div>

    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="changeIconSize">changeIconSize</a>
    </div>

    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="changePlayIcon">changePlayIcon</a>
    </div>

    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="changePauseIcon">changePauseIcon</a>
    </div>

    <div class="buttons-wrapper">
      <a href="javascript:" class="button" @click="changeAll">changeAll</a>
    </div>

    <h5-audio-controls
      ref="h5AudioControlsRef"
      :src="audioControlsConfig.src"
      :position="audioControlsConfig.position"
      :positionType="audioControlsConfig.positionType"
      :buttonSize="audioControlsConfig.buttonSize"
      :iconSize="audioControlsConfig.iconSize"
      :playIcon="audioControlsConfig.playIcon"
      :pauseIcon="audioControlsConfig.pauseIcon"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import H5AudioControls from '@/components/h5AudioControls/H5AudioControls.vue'

const aAudioSrc = [
  'https://cycjimmy.github.io/staticFiles/media/Richard_Clayderman-LOVE_IS_BLUE.mp3',
  'https://cycjimmy.github.io/staticFiles/media/Richard_Clayderman-Secget_Garden.mp3'
]
const aPosition = ['left-top', 'top-right', 'right-bottom', 'left-bottom']
const aButtonSize = ['16vw', '12vw']
const aIconSize = ['10vw', '7vw']
const aPlayIconSrc = [
  'https://cycjimmy.github.io/staticFiles/images/icons/icon-play1.svg',
  'https://cycjimmy.github.io/staticFiles/images/icons/icon-play2.svg'
]
const aPauseIconSrc = [
  'https://cycjimmy.github.io/staticFiles/images/icons/icon-pause1.svg',
  'https://cycjimmy.github.io/staticFiles/images/icons/icon-pause2.svg'
]

const h5AudioControlsRef = ref()
const audioControlsConfig = ref({
  src: aAudioSrc[0],
  position: aPosition[0],
  positionType: 'fixed',
  buttonSize: aButtonSize[0],
  iconSize: aIconSize[0],
  playIcon: aPlayIconSrc[0],
  pauseIcon: aPauseIconSrc[0]
})

const play = () => {
  h5AudioControlsRef.value.play()
}
const pause = () => {
  h5AudioControlsRef.value.pause()
}
const stop = () => {
  h5AudioControlsRef.value.stop()
}
const trigger = () => {
  if (h5AudioControlsRef.value.isPlaying()) {
    h5AudioControlsRef.value.pause()
  } else {
    h5AudioControlsRef.value.play()
  }
}
const changeAudioSrc = () => {
  switch (audioControlsConfig.value.src) {
    case aAudioSrc[0]:
      audioControlsConfig.value.src = aAudioSrc[1]
      break

    case aAudioSrc[1]:
      audioControlsConfig.value.src = aAudioSrc[0]
      break
  }
}
const changePosition = () => {
  switch (audioControlsConfig.value.position) {
    case aPosition[0]:
      audioControlsConfig.value.position = aPosition[1]
      break
    case aPosition[1]:
      audioControlsConfig.value.position = aPosition[2]
      break
    case aPosition[2]:
      audioControlsConfig.value.position = aPosition[3]
      break
    case aPosition[3]:
      audioControlsConfig.value.position = aPosition[0]
      break
  }
}
const changeButtonSize = () => {
  switch (audioControlsConfig.value.buttonSize) {
    case aButtonSize[0]:
      audioControlsConfig.value.buttonSize = aButtonSize[1]
      break
    case aButtonSize[1]:
      audioControlsConfig.value.buttonSize = aButtonSize[0]
      break
    default:
      audioControlsConfig.value.buttonSize = aButtonSize[0]
  }
}
const changeIconSize = () => {
  switch (audioControlsConfig.value.iconSize) {
    case aIconSize[0]:
      audioControlsConfig.value.iconSize = aIconSize[1]
      break
    case aIconSize[1]:
      audioControlsConfig.value.iconSize = aIconSize[0]
      break
    default:
      audioControlsConfig.value.iconSize = aIconSize[0]
  }
}
const changePlayIcon = () => {
  switch (audioControlsConfig.value.playIcon) {
    case aPlayIconSrc[0]:
      audioControlsConfig.value.playIcon = aPlayIconSrc[1]
      break
    case aPlayIconSrc[1]:
      audioControlsConfig.value.playIcon = aPlayIconSrc[0]
      break
    default:
      audioControlsConfig.value.playIcon = aPlayIconSrc[0]
  }
}
const changePauseIcon = () => {
  switch (audioControlsConfig.value.pauseIcon) {
    case aPauseIconSrc[0]:
      audioControlsConfig.value.pauseIcon = aPauseIconSrc[1]
      break
    case aPauseIconSrc[1]:
      audioControlsConfig.value.pauseIcon = aPauseIconSrc[0]
      break
    default:
      audioControlsConfig.value.pauseIcon = aPauseIconSrc[0]
  }
}
const changeAll = () => {
  changeAudioSrc()
  changePosition()
  changeButtonSize()
  changeIconSize()
  changePlayIcon()
  changePauseIcon()
}
</script>

<style>
.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
}

.buttons-wrapper {
  display: flex;
  width: 80vw;
}

.button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 5px;

  font-size: 16px;
  border: 1px solid white;
  border-radius: 4px;
  color: white;
}
</style>
