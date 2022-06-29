# vue-h5-audio-controls

![][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

* 简易的Vue版H5音乐控制器. [Demo][github-pages-url]. 
* 该插件将 [@cycjimmy/h5-audio-controls][h5-audio-controls-url] 扩展到为支持vue@2. 它的渲染模式仍是DOM. [![h5 audio controls image][h5-audio-controls-image]][h5-audio-controls-url]

语言: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## 如何使用
### 安装
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
$ npm install @cycjimmy/vue-h5-audio-controls --save
# 或者
$ yarn add @cycjimmy/vue-h5-audio-controls
```

### 使用
[![vue][vue-image]][vue-url]

通过调用 `Vue.use()` 使用插件. 这需要在你调用 `new Vue()` 启动应用之前完成:
```javascript
import Vue from 'vue';
import H5AudioControls from '@cycjimmy/vue-h5-audio-controls';

Vue.use(H5AudioControls);
```

将 `<h5-audio-controls />` 组件放入Vue节点中，该节点最好是根节点
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
  * `src`: [必选][string] 音频文件的URL地址.
  * `position`: [可选][string] 设定控制器的位置.
    * 选择以下四个选项之一:
      * `'left-top'`
      * `'top-right'`(默认)
      * `'right-bottom'`
      * `'left-bottom'`
  * `positionType`: [可选][string] 设定控制器的定位类型.
    * 选择以下五个选项之一:
      * `'fixed'`(默认)
      * `'absolute'`
      * `'relative'`
      * `'sticky'`
      * `'static'`
  * `buttonSize`: [可选][string|number] 设置按钮包裹层的尺寸.
  * `iconSize`: [可选][string|number] 设置按钮图标的尺寸.
  * `playIcon`: [可选][string] 设置播放图标.
  * `pauseIcon`: [可选][string] 设置暂停图标.
  * `autoPlay`: [可选][boolean] 加载后是否立即播放(自动播放). 默认为 `true`.

* Methods 方法
  * `play()`: 播放音频.
  * `pause()`: 暂停音频.
  * `stop()`: 停止音频.
  * `isPlaying()`: 返回音频是否正在播放.
  
### 一个进阶的例子
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

### 快速体验（在浏览器中使用）
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

使用CDN可在您的html中添加:
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
