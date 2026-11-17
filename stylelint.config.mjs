export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
  ],
  ignoreFiles: [
    'dist/**',
    '.release/**',
    '.publish/**',
    'coverage/**',
  ],
  overrides: [
    {
      // The styles of this package live inside the Vue SFCs, so stylelint has
      // to be pointed at the <style> block instead of a plain stylesheet.
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}
