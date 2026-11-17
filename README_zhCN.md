# vue-h5-audio-controls

![Test CI][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

* 简易的Vue版H5音乐控制器. [Demo][github-pages-url]. 
* 该插件扩展了 [@cycjimmy/h5-audio-controls][h5-audio-controls-url] 以支持vue@3. 它的渲染模式仍是DOM. [![h5 audio controls image][h5-audio-controls-image]][h5-audio-controls-url]
* 该版本已经不再支持vue@2。如要使用vue@2，可使用[v1][github-tag-v1]。

语言: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## 环境要求

* Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`，用于安装与构建（参见 `package.json` 的 `engines`）。
* 现代常青浏览器：发布的产物 target 为 ES2015，不再支持 IE。
* `vue` `^3.4.0` 是 peer 依赖，不会被打进本包。

## 模块形态

本包**仅提供 ESM**：

| 文件 | 格式 | 用途 |
| --- | --- | --- |
| `dist/h5-audio-controls.esm.js` | ESM | `main`、`module`、`exports` 入口（打包器 / `import`） |
| `dist/h5-audio-controls.umd.js` | UMD | 未压缩的浏览器构建，供 GitHub Pages demo 使用 |
| `dist/h5-audio-controls.umd.min.js` | UMD | 压缩后的浏览器 / CDN 构建，对应 `browser`/`unpkg`/`jsdelivr` |

* 不再提供 CommonJS 产物。Node.js 22.12+ 可以用 `require()` 加载 ESM 入口（因为会同步加载
  ES module），但它返回模块命名空间，需要从 `default` 上取组件：
  `const { default: H5AudioControls } = require('@cycjimmy/vue-h5-audio-controls')`。
* ESM 构建里的 `vue` 由使用方提供，UMD 构建依赖全局 `Vue` 对象，因此 `<script>` 必须先加载
  Vue。
* 类型声明在 `types/index.d.ts`，由 `exports` 的 `types` 条件引用。

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
import H5AudioControls from '@cycjimmy/vue-h5-audio-controls'
import Vue from 'vue'

Vue.use(H5AudioControls)
```

将 `<h5-audio-controls />` 组件放入Vue节点中，该节点最好是根节点
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

    <!-- 这是一个用于模拟方法的外部控制按钮 -->
    <botton @click="trigger">
      Trigger
    </botton>
  </div>
</template>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

使用CDN可在您的html中添加。UMD 构建依赖全局 `Vue` 对象，因此需要先加载 Vue：
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

如果打包器支持 `<script type="module">` 且可解析 `vue`，也可以直接用模块构建：
```html
<script type="module">
  import H5AudioControls from 'https://cdn.jsdelivr.net/npm/@cycjimmy/vue-h5-audio-controls@3/dist/h5-audio-controls.esm.js'
</script>
```

## 从 2.x 升级

* 不再提供 `require` 入口。本包仅提供 ESM，CJS 产物不再发布，`import` 是唯一支持的入口。
* 产物改名：`h5-audio-controls.es.js` → `h5-audio-controls.esm.js`，并新增用于 CDN 的
  `dist/h5-audio-controls.umd.min.js`。
* `vue` 改为 peer 依赖，由使用方项目提供。
* `@cycjimmy/h5-audio-controls` 升级到 6.x，它同样已改为仅 ESM。
* 工具链要求 Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`。

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
