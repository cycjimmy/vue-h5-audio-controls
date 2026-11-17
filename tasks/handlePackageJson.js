import path from 'node:path'

import fs from 'fs-extra'

const { readJsonSync, outputJsonSync } = fs

const jsonData = readJsonSync(
  path.resolve('package.json'),
)

if (jsonData.scripts) {
  delete jsonData.scripts
}

// `@cycjimmy/h5-audio-controls` is bundled into dist, and vue is a peer
// dependency, so nothing is left to install at runtime.
if (jsonData.dependencies) {
  delete jsonData.dependencies
}

if (jsonData.devDependencies) {
  delete jsonData.devDependencies
}

if (jsonData.config) {
  delete jsonData.config
}

// A scoped package without `publishConfig.access` is published as `restricted`.
// Keep the access level only: the registry and the tag are decided by the
// release tooling, not by the source package.json.
jsonData.publishConfig = {
  access: jsonData.publishConfig?.access ?? 'public',
}

outputJsonSync(
  path.resolve('.release', 'package.json'),
  jsonData,
  {
    spaces: 2,
  },
)

console.log('handlePackageJson success!')
