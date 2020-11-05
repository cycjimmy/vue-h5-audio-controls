# vue-h5-audio-controls

![][workflows-badge-image]
[![build status][travis-image]][travis-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

* Simple h5 music controller for vue. [Demo][github-pages-url]. 
* This plugin extends [@cycjimmy/h5-audio-controls][h5-audio-controls-url] to support vue@2. Its rendering mode is still DOM. [![h5 audio controls image][h5-audio-controls-image]][h5-audio-controls-url]

Language: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## How to use
### Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
$ npm install @cycjimmy/vue-h5-audio-controls --save
# or
$ yarn add @cycjimmy/vue-h5-audio-controls
```

### Usage
[![vue][vue-image]][vue-url]

Use plugin by calling the `Vue.use()`. This has to be done before you start your app by calling `new Vue()`:
```javascript
import Vue from 'vue';
import H5AudioControls from '@cycjimmy/vue-h5-audio-controls';

Vue.use(H5AudioControls);
```

Put `<h5-audio-controls />` into vue node which is preferably the root node
```vue
<template>
  <div>
    <h5-audio-controls 
      src="https://www.xxx.com/foo.mp3"
    />
  </div>
</template>
```

* Props
  * `src`: [Require][string] a url to an audio file
  * `position`: [Option][string] the position of audio controller.
    * Choose one of the four options:
      * `'left-top'`
      * `'top-right'`(Default)
      * `'right-bottom'`
      * `'left-bottom'`
  * `positionType`: [Option][string] Set position type of audio controller.
    * Choose one of the five options:
      * `'fixed'`(Default)
      * `'absolute'`
      * `'relative'`
      * `'sticky'`
      * `'static'`
  * `buttonSize`: [Option][string|number] Set button wrapper size.
  * `iconSize`: [Option][string|number] Set button icon size.
  * `playIcon`: [Option][string] Set play icon.
  * `pauseIcon`: [Option][string] Set pause icon.
  * `autoPlay`: [Option][boolean] Whether to play immediately after loading. Default `true`.

* Methods
  * `play()`: Play the audio.
  * `pause()`: Pause the audio.
  * `stop()`: Stop the audio.
  * `isPlaying()`: Return whether the audio is playing.
  
### An advanced example
```vue
<template>
  <div>
    <h5-audio-controls 
      ref="h5AudioControls"
      :src="audioControlsConfig.src"
      :position="audioControlsConfig.position"
      :buttonSize="audioControlsConfig.buttonSize"
      :iconSize="audioControlsConfig.iconSize"
      :playIcon="audioControlsConfig.playIcon"
      :pauseIcon="audioControlsConfig.pauseIcon"
      :autoPlay="audioControlsConfig.autoPlay"
    />

    <!-- This is an external control button to simulate methods -->
    <botton @click="trigger">Trigger</botton>
  </div>
</template>
  
<script>
  import playIcon from './images/icon-play.png';
  import pauseIcon from './images/icon-pause.png';

  export default {
    name: 'app',
    data() {
      return {
        audioControlsConfig: {
          src: 'https://www.xxx.com/foo.mp3',
          position: 'left-top',
          buttonSize: '15vw',
          iconSize: '12vw',
          playIcon,
          pauseIcon,
          autoPlay: true
        }
      };
    },
    methods: {
      trigger(){
        if(this.$refs.h5AudioControls.isPlaying()) {
          this.$refs.h5AudioControls.pause();
        } else {
          this.$refs.h5AudioControls.play();
        }
      }
    }
  };
</script>
```

### Quick experience（Use in browser）
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script src="vue-h5-audio-controls.umd.min.js"></script>
<script type="module">
  Vue.use(H5AudioControls);

  new Vue({
    el: '#app',
    template: `
    <div>
      <h5-audio-controls
        src: 'https://www.xxx.com/foo.mp3'
      />
    </div>`,
  });
</script>
<div id="app"></div>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your html:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/vue-h5-audio-controls@1/dist/h5-audio-controls.umd.min.js"></script>
```

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/vue-h5-audio-controls
[npm-url]: https://npmjs.org/package/@cycjimmy/vue-h5-audio-controls
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/vue-h5-audio-controls

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/vue-h5-audio-controls
[download-url]: https://npmjs.org/package/@cycjimmy/vue-h5-audio-controls

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/vue-h5-audio-controls
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/vue-h5-audio-controls

[workflows-badge-image]: https://github.com/cycjimmy/vue-h5-audio-controls/workflows/Test%20CI/badge.svg
[travis-image]: https://img.shields.io/travis/cycjimmy/vue-h5-audio-controls
[travis-url]: https://travis-ci.org/cycjimmy/vue-h5-audio-controls

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/vue-h5-audio-controls
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/vue-h5-audio-controls
[libraries-status-url]: https://libraries.io/github/cycjimmy/vue-h5-audio-controls
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fvue-h5-audio-controls

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/vue-h5-audio-controls
[coverage-url]: https://coveralls.io/github/cycjimmy/vue-h5-audio-controls

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/vue-h5-audio-controls
[release-url]: https://github.com/cycjimmy/vue-h5-audio-controls/releases

[rollup-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/vue-h5-audio-controls/dev/rollup
[rollup-url]: https://github.com/rollup/rollup

[vue-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/vue-h5-audio-controls/dev/vue
[vue-url]: https://github.com/vuejs/vue

[h5-audio-controls-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/vue-h5-audio-controls/@cycjimmy/h5-audio-controls
[h5-audio-controls-url]: https://github.com/cycjimmy/h5-audio-controls

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/vue-h5-audio-controls

[github-pages-url]: https://cycjimmy.github.io/vue-h5-audio-controls/

[Readme-url-En]: https://github.com/cycjimmy/vue-h5-audio-controls/blob/master/README.md
[Readme-url-ZhCN]: https://github.com/cycjimmy/vue-h5-audio-controls/blob/master/README_zhCN.md
