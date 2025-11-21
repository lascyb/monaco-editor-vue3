# @lascyb/monaco-editor-vue3

Monaco Editor 的 Vue 3 组件封装，提供单栏编辑器 `MonacoEditor` 和差异编辑器 `MonacoDiffEditor` 两种实现。

支持语法高亮、代码补全、错误检查等 Monaco Editor 的所有功能，并提供灵活的扩展配置。

## 安装

```bash
npm install @lascyb/monaco-editor-vue3 monaco-editor
```

> 依赖要求：Vue 3 + Vite（或任意支持 ESM 的构建工具）。

## 快速开始

### 1. 配置 Worker 环境（推荐）

在使用编辑器组件之前，建议先配置 Worker 环境以启用完整功能：

```ts
// main.js 或 main.js
import '@lascyb/monaco-editor-vue3/extensions/environment'
```

### 2. 使用组件

```vue
<script setup lang="ts">
  import {MonacoEditor} from '@lascyb/monaco-editor-vue3'
  import {ref} from 'vue'

  const code = ref('{"name":"lascyb"}')
</script>

<template>
  <MonacoEditor v-model="code" language="json"/>
</template>
```

**组件特性：**
- `MonacoEditor` 支持 `v-model`、`language`、`theme`、`options`、`initOptions` 等常见配置
- `MonacoDiffEditor` 额外暴露 `original`（通过 `v-model:original`）与 `modified` 双模型，适配差异对比场景

## 完整示例

```ts 
//main.js
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
      v-model="code" 
      language="typescript"
      theme="vs-dark"
      :options="{ minimap: { enabled: true } }"
    />
    
    <h3>差异编辑器</h3>
    <MonacoDiffEditor 
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

### Worker 环境配置

Worker 环境配置用于启用语法高亮、代码补全、错误检查等语言服务功能。该扩展使用 Vite 的 `?worker` 语法来加载 Worker 文件，因此**仅适用于 Vite 构建工具**。

**使用方式：**

```ts
// main.js 或 main.js
import '@lascyb/monaco-editor-vue3/extensions/environment'
```

导入后会自动配置 Worker 环境，无需额外操作。如果已经存在 `MonacoEnvironment`，则不会覆盖现有配置。

**说明：**
- 必须在创建编辑器实例之前导入
- 只需导入一次即可，多次导入不会覆盖执行（代码会检查 `MonacoEnvironment` 是否已存在，如果已存在则跳过配置）
- 当前配置了以下语言的 Worker：
  - JSON
  - CSS/SCSS/Less
  - HTML/Handlebars/Razor
  - TypeScript/JavaScript
  - 其他语言使用默认的 editorWorker
- 如需自定义配置，可复制 `extensions/environment.js` 到项目中修改
- **注意**：此扩展依赖 Vite 的 Worker 导入语法，非 Vite 项目需要自行实现 Worker 配置

### 语言包配置

该扩展默认启用中文简体界面。

**使用方式：**

```ts
// main.js
import '@lascyb/monaco-editor-vue3/extensions/i18n' // 导入语言包扩展（默认中文简体）
```

或者直接导入 Monaco Editor 的语言包：

```ts
// main.js
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

### 自定义键盘快捷键

直接导入扩展文件即可自动配置快捷键：

```ts
// main.js
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
