import { defineConfig } from 'vite'
import UnocssPlugin from '@unocss/vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnocssPlugin({
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})
