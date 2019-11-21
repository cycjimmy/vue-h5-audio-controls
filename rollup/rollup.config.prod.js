import pkg from '../package.json';

import { banner, input, name, external, plugins, terserPlugins } from './rollup.common';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external,
    plugins
  },
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format: 'umd',
      banner
    },
    external,
    plugins: [...plugins, terserPlugins]
  }
];
