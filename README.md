# @lascyb/monaco-editor-vue3

Monaco Editor 的 Vue 3 组件封装，内置 worker 注册与中文语言包初始化，提供单栏编辑器 `MonacoEditor` 和差异编辑器 `MonacoDiffEditor` 两种实现。

## 安装

```bash
npm install @lascyb/monaco-editor-vue3 monaco-editor
```

> 依赖要求：Vue 3 + Vite（或任意支持 ESM 的构建工具）。

## 使用方式

### 方式一：安装 npm 包

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

- `MonacoEditor` 支持 `v-model`、`language`、`theme`、`options`、`initOptions` 等常见配置。
- `MonacoDiffEditor` 额外暴露 `original`（通过 `defineModel('original')`）与 `modified` 双模型，适配 Diff 选项。

### 方式二：直接引用源码

可 clone 仓库并把 `src/` 当作组件模块使用：

1. `git clone https://github.com/lascyb/monaco-editor-vue3.git`
2. 复制出src文件夹，直接作为组件引入进行使用：

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
