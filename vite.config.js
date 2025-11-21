import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import {fileURLToPath} from 'node:url'
import {resolve} from 'node:path'

const packageDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
      insertTypesEntry: true,
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.json'
    })
  ],
  build: {
    lib: {
      entry: resolve(packageDir, 'src/index.ts'),
      name: 'ConfigCenterMonacoEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs'
    },
    rollupOptions: {
      external: ['vue', 'monaco-editor'],
    }
  }
})

