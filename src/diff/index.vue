<script setup lang="ts">
import {shallowRef, markRaw, watch, onMounted, onUnmounted, useTemplateRef} from 'vue'
import type {editor} from 'monaco-editor'

import * as monaco from 'monaco-editor'
import type {Props} from "./types";

console.log(monaco.languages.getLanguages())
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
 * onMounted
 * 创建 Diff 编辑器并同步原始/修改模型
 */
onMounted(() => {
  instance.value = markRaw(monaco.editor.createDiffEditor(container.value as HTMLElement, {
    ...props.initOptions,
    ...props.options,
  }))
  instance.value.setModel({
    modified: monaco.editor.createModel(modifiedValue.value as string, props.language),
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
 * onUnmounted
 * 销毁 Diff 编辑器实例，释放关联模型
 */
onUnmounted(() => {
  instance.value?.dispose();
});
/**
 * watch props.options
 * 监听运行期配置变动并同步到 Diff 编辑器
 */
watch(() => props.options, (newValue) => {
  console.log("watch.props.options", newValue)
  if (instance.value) {
    instance.value.updateOptions(newValue)
  }
})
// watch(modifiedValue , (newValue) => {
//   if (instance.value){
//     instance.value?.getModel()?.modified?.setValue(newValue)
//   }
// })
// watch(originalValue, (newValue) => {
//   if (instance.value){
//     instance.value?.getModel()?.original?.setValue(newValue)
//   }
// })

/**
 * watch props.language
 * 同步 original/modified 模型的语言定义
 */
watch(() => props.language, (newLanguage) => {
  console.log(newLanguage)
  if (instance.value) {
    let model = instance.value.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model.modified, newLanguage)
      monaco.editor.setModelLanguage(model.original, newLanguage)
    }
  }
})
/**
 * watch props.theme
 * 直接通过 monaco.editor.setTheme 切换全局主题
 */
watch(() => props.theme, (newValue) => {
  console.log(newValue)
  if (instance.value) {
    monaco.editor.setTheme(newValue)
    // let model = instance.value.getModel()
    // if (model) {
    //   // monaco.editor.setTheme(model.modified, newValue)
    //   monaco.editor.setTheme(model.original, newValue)
    // }
  }
})
/**
 * defineExpose
 * 暴露 getInstance 供父组件精细控制 Diff 编辑器
 */
defineExpose({
  getInstance: () => instance.value,
})
</script>

<template>
  <div ref="container"></div>
</template>

<style scoped>
</style>