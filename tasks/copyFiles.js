import { resolve } from 'node:path';
import fs from 'fs-extra';

const { copySync } = fs

copySync(
  resolve('dist'),
  resolve('.release', 'dist')
)
copySync(
  resolve('types'),
  resolve('.release', 'types')
)
copySync(
  resolve('README.md'),
  resolve('.release', 'README.md')
)
copySync(
  resolve('LICENSE'),
  resolve('.release', 'LICENSE')
)

console.log('copyFiles success!')
