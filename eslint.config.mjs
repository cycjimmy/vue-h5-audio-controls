import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    type: 'lib',
    vue: true,
    typescript: true,
    vitest: true,
    ignores: [
      'dist/**',
      '.release/**',
      '.publish/**',
      'coverage/**',
      'docs/**',
    ],
  },
  {
    files: ['tasks/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // These are CLI helpers: their progress output is the program's output.
      'no-console': 'off',
    },
  },
  {
    // App.vue is the single-page harness of the Vite dev server, its name is
    // not part of the public API.
    files: ['src/App.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    // The component template only exposes an empty node: its ref is handed to
    // @cycjimmy/h5-audio-controls from setup, which the rule cannot follow.
    files: ['src/components/**/*.vue'],
    rules: {
      'vue/no-unused-refs': 'off',
    },
  },
)
