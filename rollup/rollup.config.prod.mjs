/* eslint import/extensions: ["error", "ignorePackages", {"mjs": off}] */
import pkg from '../package.cjs';

import {
  banner, input, name, external, plugins, terserPlugins,
} from './rollup.common.mjs';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es', exports: 'default' },
    ],
    external,
    plugins,
  },
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format: 'umd',
      banner,
      exports: 'default',
    },
    external,
    plugins: [...plugins, terserPlugins],
  },
];
