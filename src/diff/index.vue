<script setup lang="ts">
import {shallowRef, markRaw, watch, onMounted, onUnmounted, useTemplateRef} from 'vue'
import type {editor} from 'monaco-editor'

import * as monaco from 'monaco-editor'
import type {Props} from "./types";

const modifiedValue = defineModel({
  type: String,
  required: true,
})
const originalValue = defineModel("original", {
  required: true,
  type: String,
})

const props = withDefaults(defineProps<Props>(), {
  language: undefined,
  theme: 'vs-dark',
  options: () => ({}),
  initOptions: () => ({})
})

const container = useTemplateRef("container")
const instance = shallowRef<editor.IStandaloneDiffEditor>()

/**
 * onMounted 生命周期钩子
 * 创建 Diff 编辑器并同步原始/修改模型
 */
onMounted(() => {
  instance.value = markRaw(monaco.editor.createDiffEditor(container.value as HTMLElement, {
    automaticLayout: true,
    ...props.initOptions,
    ...props.options,
  }));
  instance.value.setModel({
    modified: monaco.editor.createModel(modifiedValue.value, props.language),
    original: monaco.editor.createModel(originalValue.value, props.language),
  })
  instance.value.getModifiedEditor().onKeyUp(() => {
    let value = instance.value?.getModel()?.modified.getValue()
    if (value) {
      modifiedValue.value = value
    }
  })
  instance.value.getOriginalEditor().onKeyUp(() => {
    let value = instance.value?.getModel()?.original.getValue()
    if (value) {
      originalValue.value = value
    }
  })
})
/**
 * onUnmounted 生命周期钩子
 * 销毁 Diff 编辑器实例，释放关联模型
 */
onUnmounted(() => {
  instance.value?.dispose();
});
/**
 * watch props.options 监听器
 * 监听运行期配置变动并同步到 Diff 编辑器
 */
watch(() => props.options, (newValue) => {
  if (instance.value) {
    instance.value.updateOptions(newValue)
  }
})

/**
 * watch props.language 监听器
 * 同步 original/modified 模型的语言定义
 */
watch(() => props.language, (newLanguage) => {
  if (instance.value) {
    const model = instance.value.getModel()
    if (model && newLanguage) {
      monaco.editor.setModelLanguage(model.modified, newLanguage)
      monaco.editor.setModelLanguage(model.original, newLanguage)
    }
  }
})

/**
 * watch props.theme 监听器
 * 直接通过 monaco.editor.setTheme 切换全局主题
 */
watch(() => props.theme, (newTheme) => {
  if (newTheme) {
    monaco.editor.setTheme(newTheme)
  }
})

/**
 * defineExpose 暴露方法
 * 暴露 getInstance 供父组件精细控制 Diff 编辑器实例
 */
defineExpose({
  getInstance: () => instance.value,
})
</script>

<template>
  <div ref="container" style="height: 100px;"></div>
</template>

<style scoped>
</style>