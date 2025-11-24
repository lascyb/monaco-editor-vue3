# @lascyb/monaco-editor-vue3

Monaco Editor 的 Vue 3 组件封装，提供单栏编辑器 `MonacoEditor` 和差异编辑器 `MonacoDiffEditor` 两种实现。

支持语法高亮、代码补全、错误检查等 Monaco Editor 的所有功能，并提供灵活的扩展配置。

## 功能特性

- 🧩 **双组件模式**：`MonacoEditor`、`MonacoDiffEditor` 覆盖常规编辑和差异对比场景
- 🔁 **双向绑定**：原生支持 `v-model` / `v-model:original`，并对 `options`、`theme`、`language` 做响应式处理
- ⚙️ **扩展友好**：内置 Worker、i18n、快捷键等扩展文件，可直接导入或按需拷贝定制
- 🧠 **类型完备**：以 TypeScript 开发，暴露完整的 Monaco 类型定义
- 🚀 **MonacoEnvironment 帮助**：提供 `extensions/environment.ts` 作为 Worker 配置模板，可配合 `window.__MONACO_WORKER_IMPORTER__`、`window.__MONACO_WORKER_BASE_URL__` 等钩子扩展

## 安装

```bash
npm install @lascyb/monaco-editor-vue3 monaco-editor
```

> 依赖要求：Vue 3 + Vite（或任意支持 ESM 的构建工具）。

## 快速开始

### 1. 配置 Worker 环境（推荐）

在使用编辑器组件之前，务必配置 Worker 才能获得语法高亮、补全、诊断等完整能力：

```ts
// 1. Vite / 支持 ?worker 的构建工具
import '@lascyb/monaco-editor-vue3/extensions/environment'

// 2. 非 Vite 环境（Webpack、Rspack、自建脚手架等）
// 复制 extensions/environment-custom.ts 到你的项目，并改为相对路径导入
// import '@/monaco/environment-custom'
```

> ⚠️ 提示：`extensions/environment.ts` 默认不会被打包到 npm 产物中，部分构建环境下 `import '@lascyb/monaco-editor-vue3/extensions/environment'` 可能无法直接解析。可以将对应文件拷贝到业务仓库（例如 `src/monaco/environment.ts`），再按需修改后导入。
>
> - 需要自定义 Worker 加载流程时，可在运行期提供 `window.__MONACO_WORKER_IMPORTER__ = (label) => import('xxx?worker')`
> - 需要自定义静态资源前缀时，可设置 `window.__MONACO_WORKER_BASE_URL__ = '/static/monaco'`

### 2. 使用组件

```vue
<script setup lang="ts">
  import {MonacoEditor} from '@lascyb/monaco-editor-vue3'
  import {ref} from 'vue'

  const code = ref('{"name":"lascyb"}')
</script>

<template>
  <MonacoEditor v-model="code" language="json" style="height: 100px"/>
</template>
```

**组件特性：**
- `MonacoEditor` 支持 `v-model`、`language`、`theme`、`options`、`initOptions` 等常见配置
- `MonacoDiffEditor` 额外暴露 `original`（通过 `v-model:original`）与 `modified` 双模型，适配差异对比场景

## 完整示例

```ts 
//main.ts
import '@lascyb/monaco-editor-vue3/extensions/environment' //Worker 环境配置
import '@lascyb/monaco-editor-vue3/extensions/i18n' // 导入语言包扩展（默认中文简体）
import '@lascyb/monaco-editor-vue3/extensions/keybinding' // 导入快捷键扩展

```

```vue 
//App.vue

<script setup lang="ts">
import { ref } from 'vue'
import { MonacoEditor, MonacoDiffEditor } from '@lascyb/monaco-editor-vue3'

const code = ref('const hello = "world"')
const original = ref('const hello = "old"')
const modified = ref('const hello = "new"')
</script>

<template>
  <div>
    <h3>单栏编辑器</h3>
    <MonacoEditor 
        style="height: 100px"
      v-model="code"
      language="typescript"
      theme="vs-dark"
      :options="{ minimap: { enabled: true } }"
    />
    
    <h3>差异编辑器</h3>
    <MonacoDiffEditor 
      style="height: 100px"
      v-model="modified"
      v-model:original="original"
      language="typescript"
      theme="vs-dark"
    />
  </div>
</template>
```

## 扩展

项目中提供了扩展文件，位于 `extensions/` 目录下，你可以直接导入使用或参考这些扩展来配置 Monaco Editor。

1. ### Worker 环境配置

Worker 环境配置用于启用语法高亮、代码补全、错误检查等语言服务功能。根据构建工具不同，可选择下表中的方案：

| 场景 | 推荐文件 | 说明 |
| --- | --- | --- |
| Vite / 支持 `?worker` | `extensions/environment.ts` | 直接导入即可，依赖构建器自动处理 `?worker` |
| Webpack、Rspack、自建脚手架 | `extensions/environment-custom.ts` | 直接 `import` worker，并返回 `new Worker('xxx.js', {type: 'module'})`，无需 `?worker` |
| 复杂或自定义需求 | 自行复制两份示例 | 可结合 `window.__MONACO_WORKER_IMPORTER__`、`__MONACO_WORKER_BASE_URL__` 等钩子扩展 |

**使用方式：**

```ts
// main.ts 或 main.ts
import '@lascyb/monaco-editor-vue3/extensions/environment'

// 非 Vite 示例：复制 environment-custom.ts 并改为相对路径导入
// import '@/monaco/environment-custom'
```

> ⚠️ 提示：若直接导入该文件出现 “Cannot find module” 等错误，请复制 `extensions/environment.ts` 到你的应用仓库，并以本地路径引入；这样也更方便按需调整 Worker 分配策略。

导入后会自动配置 Worker 环境，无需额外操作。如果已经存在 `MonacoEnvironment`，则不会覆盖现有配置。你也可以通过以下两个钩子覆盖默认行为：

- `window.__MONACO_WORKER_IMPORTER__`：自定义基于 `label` 的导入函数，适合自行控制 `import('xxx?worker')`
- `window.__MONACO_WORKER_BASE_URL__`：指定 Worker 静态资源基础路径，适合 CDN/非 Vite 场景

**说明：**
- 必须在创建编辑器实例之前导入
- 只需导入一次即可，多次导入不会覆盖执行（代码会检查 `MonacoEnvironment` 是否已存在，如果已存在则跳过配置）
- 当前配置了以下语言的 Worker：
  - JSON
  - CSS/SCSS/Less
  - HTML/Handlebars/Razor
  - TypeScript/JavaScript
  - 其他语言使用默认的 editorWorker
- 如需自定义配置，可复制 `extensions/environment.ts` 到项目中修改
- **注意**：此扩展依赖 Vite 的 Worker 导入语法，非 Vite 项目需要自行实现 Worker 配置

2. ### 语言包配置

该扩展默认启用中文简体界面。

**使用方式：**

```ts
// main.ts
import '@lascyb/monaco-editor-vue3/extensions/i18n' // 导入语言包扩展（默认中文简体）
```

或者直接导入 Monaco Editor 的语言包：

```ts
// main.ts
import 'monaco-editor/esm/nls.messages.zh-cn.js' // 导入中文语言包
```

**自定义语言包：**

扩展文件 `extensions/i18n.js` 中列出了所有支持的语言包，默认启用中文简体，其他语言包已注释。如需使用其他语言，可取消对应语言包的注释：

```ts
// extensions/i18n.js
// 中文简体（默认启用）
import "monaco-editor/esm/nls.messages.zh-cn.js"

// 其他语言包（已注释，需要时可取消注释）
// import "monaco-editor/esm/nls.messages.zh-tw.js" // 中文繁体
// import "monaco-editor/esm/nls.messages.de.js" // 德语
// import "monaco-editor/esm/nls.messages.es.js" // 西班牙语
// import "monaco-editor/esm/nls.messages.fr.js" // 法语
// import "monaco-editor/esm/nls.messages.it.js" // 意大利语
// import "monaco-editor/esm/nls.messages.ja.js" // 日语
// import "monaco-editor/esm/nls.messages.ko.js" // 韩语
// import "monaco-editor/esm/nls.messages.pt-br.js" // 葡萄牙语（巴西）
// import "monaco-editor/esm/nls.messages.ru.js" // 俄语
// import "monaco-editor/esm/nls.messages.tr.js" // 土耳其语
```

3. ### 自定义键盘快捷键

直接导入扩展文件即可自动配置快捷键：

```ts
// main.ts
import '@lascyb/monaco-editor-vue3/extensions/keybinding' // 导入快捷键扩展
```

当前扩展配置了 `Ctrl+Alt+L` (Mac: `Cmd+Alt+L`) 快捷键来格式化文档。

如需自定义快捷键，可参考 `extensions/keybinding.js` 或复制代码到项目中修改：

```ts
import * as monaco from 'monaco-editor'

// 添加自定义快捷键
monaco.editor.addKeybindingRules([
  {
    keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
    command: 'editor.action.formatDocument'
  }
])
```

## 直接引用源码

可 clone 仓库并把 `src/` 当作组件模块使用：

## 常见问题

1. **为什么引入 `environment.ts` 报 “Cannot find module”？**  
   该文件未随 npm 包发布，请拷贝到业务仓库后通过相对路径导入，或配置 `resolve.alias`。

2. **我的构建工具不支持 `?worker`，如何处理？**  
   - 复制 `extensions/environment.ts` 并结合构建工具的 worker loader 实现 `MonacoEnvironment`
   - 或在运行期提供 `window.__MONACO_WORKER_IMPORTER__` 来接管 worker 的 import 逻辑

3. **如何自定义 Monaco 快捷键 / 语言包？**  
   参照 `extensions/keybinding.js`、`extensions/i18n.js` 直接修改或在项目内复制后引入即可。

1. `git clone https://github.com/lascyb/monaco-editor-vue3.git`
2. 复制出 `src` 文件夹，直接作为组件引入进行使用

## 参数概览

| 组件               | Prop               | 说明                                                             |
|------------------|--------------------|----------------------------------------------------------------|
| MonacoEditor     | `options`          | `editor.IEditorOptions & IGlobalEditorOptions`，运行期 `watch` 可生效 |
|                  | `initOptions`      | `IStandaloneEditorConstructionOptions`，仅创建阶段读取                 |
|                  | `language`         | 通过 `monaco.editor.setModelLanguage` 切换                         |
|                  | `theme`            | 使用 `monaco.editor.setTheme` 应用                                 |
|                  | `v-model`          | 数据内容                                                           |
| MonacoDiffEditor | `options`          | `editor.IDiffEditorOptions`                                    |
|                  | `initOptions`      | `IStandaloneDiffEditorConstructionOptions`                     |
|                  | `language`         | 通过 `monaco.editor.setModelLanguage` 切换                         |
|                  | `theme`            | 使用 `monaco.editor.setTheme` 应用                                 |
|                  | `v-model:original` | 旧数据                                                            |
|                  | `v-model`          | 新数据                                                            |
