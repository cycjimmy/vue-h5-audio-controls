# vue-h5-audio-controls

![Test CI][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

* Simple h5 music controller for vue. [Demo][github-pages-url]. 
* This plugin extends [@cycjimmy/h5-audio-controls][h5-audio-controls-url] to support vue@3. Its rendering mode is still DOM. [![h5 audio controls image][h5-audio-controls-image]][h5-audio-controls-url]
* It is no longer supported vue@2. If you use vue@2, you can use [v1][github-tag-v1].

Language: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## Requirements

* Node.js `^22.22.2 || ^24.15.0 || >=26.0.0` to install and build the package (see `engines` in `package.json`).
* A modern evergreen browser: the published bundles target ES2015, so Internet Explorer is not supported.
* `vue` `^3.4.0` is a peer dependency, it is not bundled into this package.

## Module format

The package is **ESM only**:

| File | Format | Purpose |
| --- | --- | --- |
| `dist/h5-audio-controls.esm.js` | ESM | `main`, `module`, `exports` entry (bundlers, `import`) |
| `dist/h5-audio-controls.umd.js` | UMD | unminified browser build, used by the GitHub Pages demo |
| `dist/h5-audio-controls.umd.min.js` | UMD | minified browser/CDN build, `browser`/`unpkg`/`jsdelivr` |

* There is no CommonJS bundle. Node.js 22.12+ can `require()` the ESM entry, because those
  versions load an ES module synchronously, but that returns the module namespace, so the
  component has to be read off `default`:
  `const { default: H5AudioControls } = require('@cycjimmy/vue-h5-audio-controls')`.
* `vue` is loaded from the consumer in the ESM build and from the global `Vue` object in the
  UMD builds, so a `<script>` tag has to load Vue first.
* Types are shipped in `types/index.d.ts` and referenced by the `types` condition of `exports`.

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

Put `<h5-audio-controls />` into vue node which is preferably the root node
```vue
<script setup>
import H5AudioControls from '@cycjimmy/vue-h5-audio-controls'
import { ref } from 'vue'

const src = ref('https://www.xxx.com/foo.mp3')
</script>

<template>
  <H5AudioControls :src />
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
<script setup>
import H5AudioControls from '@cycjimmy/vue-h5-audio-controls'
import { ref } from 'vue'

import pauseIcon from './images/icon-pause.png'
import playIcon from './images/icon-play.png'

const h5AudioControlsRef = ref()
const audioControlsConfig = ref({
  src: 'https://www.xxx.com/foo.mp3',
  position: 'left-top',
  positionType: 'fixed',
  buttonSize: '15vw',
  iconSize: '12vw',
  playIcon,
  pauseIcon,
  autoPlay: true,
})

function trigger() {
  if (h5AudioControlsRef.value.isPlaying()) {
    h5AudioControlsRef.value.pause()
  }
  else {
    h5AudioControlsRef.value.play()
  }
}
</script>

<template>
  <div>
    <H5AudioControls
      ref="h5AudioControlsRef"
      :src="audioControlsConfig.src"
      :position="audioControlsConfig.position"
      :position-type="audioControlsConfig.positionType"
      :button-size="audioControlsConfig.buttonSize"
      :icon-size="audioControlsConfig.iconSize"
      :play-icon="audioControlsConfig.playIcon"
      :pause-icon="audioControlsConfig.pauseIcon"
      :auto-play="audioControlsConfig.autoPlay"
    />

    <!-- This is an external control button to simulate methods -->
    <botton @click="trigger">
      Trigger
    </botton>
  </div>
</template>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your html. The UMD build expects the global `Vue` object,
so Vue has to be loaded first:
```html
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/vue-h5-audio-controls@3/dist/h5-audio-controls.umd.min.js"></script>
<script>
  const { createApp } = Vue

  createApp({
    components: { 'h5-audio-controls': H5AudioControls }
  }).mount('#app')
</script>
```

A module build is available for bundlers that understand `<script type="module">`, as long as
`vue` is resolvable:
```html
<script type="module">
  import H5AudioControls from 'https://cdn.jsdelivr.net/npm/@cycjimmy/vue-h5-audio-controls@3/dist/h5-audio-controls.esm.js'
</script>
```

## Migrating from 2.x

* The `require` entry point is gone. The package ships ESM only and the CJS bundle is no
  longer published; `import` is the supported entry point.
* The bundles are renamed: `h5-audio-controls.es.js` → `h5-audio-controls.esm.js`, and
  `dist/h5-audio-controls.umd.min.js` is added for CDN usage.
* `vue` is a peer dependency now, so the consuming project provides it.
* `@cycjimmy/h5-audio-controls` is upgraded to 6.x, which is ESM only as well.
* Node.js `^22.22.2 || ^24.15.0 || >=26.0.0` is required for the toolchain.

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/vue-h5-audio-controls
[npm-url]: https://npmjs.org/package/@cycjimmy/vue-h5-audio-controls
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/vue-h5-audio-controls

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/vue-h5-audio-controls
[download-url]: https://npmjs.org/package/@cycjimmy/vue-h5-audio-controls

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/vue-h5-audio-controls
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/vue-h5-audio-controls

[workflows-badge-image]: https://github.com/cycjimmy/vue-h5-audio-controls/workflows/Test%20CI/badge.svg

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/vue-h5-audio-controls
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/vue-h5-audio-controls
[libraries-status-url]: https://libraries.io/github/cycjimmy/vue-h5-audio-controls
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fvue-h5-audio-controls

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/vue-h5-audio-controls
[release-url]: https://github.com/cycjimmy/vue-h5-audio-controls/releases

[vue-image]: https://img.shields.io/github/package-json/peer/vue/cycjimmy/vue-h5-audio-controls
[vue-url]: https://github.com/vuejs/vue

[h5-audio-controls-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/vue-h5-audio-controls/@cycjimmy/h5-audio-controls
[h5-audio-controls-url]: https://github.com/cycjimmy/h5-audio-controls

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/vue-h5-audio-controls

[github-pages-url]: https://cycjimmy.github.io/vue-h5-audio-controls/
[github-tag-v1]: https://github.com/cycjimmy/vue-h5-audio-controls/tree/v1

[Readme-url-En]: https://github.com/cycjimmy/vue-h5-audio-controls/blob/main/README.md
[Readme-url-ZhCN]: https://github.com/cycjimmy/vue-h5-audio-controls/blob/main/README_zhCN.md
