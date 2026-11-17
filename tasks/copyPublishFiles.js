import { createRequire } from 'node:module'
import path from 'node:path'

import fs from 'fs-extra'

const { copySync, emptyDirSync } = fs

const require = createRequire(import.meta.url)

const publishDir = path.resolve('.publish')

// Clean first to keep the deployment output idempotent.
emptyDirSync(publishDir)

// static/**/* and the unminified UMD bundle → .publish, which is exactly what
// GitHub Pages serves.
copySync(path.resolve('static'), publishDir)
copySync(
  path.resolve('dist', 'h5-audio-controls.umd.js'),
  path.resolve(publishDir, 'h5-audio-controls.umd.js'),
)

// vue is an external of the UMD build, so the demo needs its global build.
// It is copied from node_modules instead of being loaded from a CDN: the demo
// page is then self-contained and does not execute third-party code.
copySync(
  require.resolve('vue/dist/vue.global.prod.js'),
  path.resolve(publishDir, 'vue.global.prod.js'),
)

console.log('copyPublishFiles success!')
