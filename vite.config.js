import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import {fileURLToPath} from 'node:url'
import {resolve} from 'node:path'

const packageDir = fileURLToPath(new URL('.', import.meta.url))
const srcDir = resolve(packageDir, 'src')
const extensionsDir = resolve(packageDir, 'extensions')

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
      entry: {
        index:resolve(srcDir, 'index.ts'),
        // "extensions/environment": resolve(extensionsDir, 'environment.ts')
      },
      name: 'MonacoEditorVue3',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs'
        return entryName === 'index' ? `index.${ext}` : `${entryName}.${ext}`
      }
    },
    rollupOptions: {
      external: ['vue', 'monaco-editor'],
    }
  }
})

