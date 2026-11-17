import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

// @ts-expect-error -- @cycjimmy/config-lib ships no type declarations.
import myBanner from '@cycjimmy/config-lib/esm/chore/myBanner.js'
// @ts-expect-error -- @cycjimmy/config-lib ships no type declarations.
import terserOption from '@cycjimmy/config-lib/esm/terser/4.x/production.js'
import vue from '@vitejs/plugin-vue'
import { configDefaults, defineConfig } from 'vitest/config'

const pkg = createRequire(import.meta.url)('./package.json')

// config-lib's shared option follows terser 4's legacy `output` key. Vite 8 always
// injects `format` and terser rejects having both, so convert `output` → `format`.
const { output, ...restTerserOption } = terserOption
const terserOptions = { ...restTerserOption, format: output }

// Output file names are derived from the pkg fields, so package.json stays the
// single source of truth for the published entry points.
const esmFileName = pkg.module.replace('dist/', '') // h5-audio-controls.esm.js
const umdFileName = pkg.browser.replace('dist/', '').replace('.min.js', '.js') // h5-audio-controls.umd.js
const umdMinFileName = pkg.browser.replace('dist/', '') // h5-audio-controls.umd.min.js

function libBuild({ formats, fileName, minify = false }: {
  formats: ('es' | 'umd')[]
  fileName: string
  minify?: boolean | 'terser'
}) {
  return {
    // Same baseline as the UMD build of @cycjimmy/h5-audio-controls.
    target: 'es2015',
    outDir: 'dist',
    // Keep artifacts of previous incremental builds (`npm run build` cleans dist first).
    emptyOutDir: false,
    minify,
    ...(minify === 'terser' && { terserOptions }),
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'H5AudioControls',
      formats,
      fileName: () => fileName,
    },
    rollupOptions: {
      // vue stays external: it is a peer dependency and the UMD build maps it
      // to the global `Vue` object. Every other dependency is bundled in, so a
      // single <script> tag is enough for the UMD builds.
      external: ['vue'],
      output: {
        exports: 'default' as const,
        globals: { vue: 'Vue' },
        // Only the minified CDN bundle carries the license banner.
        ...(minify === 'terser' && {
          banner: myBanner(pkg),
        }),
      },
    },
  }
}

const builds = {
  'esm': libBuild({
    formats: ['es'],
    fileName: esmFileName,
  }),
  'umd': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
  'umd-min': libBuild({
    formats: ['umd'],
    fileName: umdMinFileName,
    minify: 'terser',
  }),
  // Deployment build for GitHub Pages: readable UMD bundle for the demo page.
  'deployment': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
}

export default defineConfig(({ mode }) => {
  const build = builds[mode as keyof typeof builds]

  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
        // The dev harness is not part of the published package.
        include: ['src/**/*.{ts,vue}'],
        exclude: ['src/dev.ts', 'src/App.vue'],
      },
    },
    ...(build
      ? { build }
      : {}),
  }
})
