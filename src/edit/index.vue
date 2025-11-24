<script setup lang="ts">
import {shallowRef, markRaw, watch, onMounted, onUnmounted, useTemplateRef} from 'vue'
import type {editor} from 'monaco-editor'

import * as monaco from 'monaco-editor'
import type {Props} from "./types";

const modelValue = defineModel({
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
const instance = shallowRef<editor.IStandaloneCodeEditor>()

const updateModel = () => {
  if (instance.value){
    const value = instance.value?.getValue()
    if (value !== undefined) {
      modelValue.value = value
    }
  }
}
/**
 * onMounted 生命周期钩子
 * 创建单实例编辑器并绑定输入联动
 */
onMounted(() => {
  instance.value = markRaw(monaco.editor.create(container.value as HTMLElement, {
    ...props.initOptions,
    ...props.options,
    ...(props.theme) && {theme: props.theme},
    ...(props.language) && {language: props.language},
    value: modelValue.value
  }))
  instance.value.onDidChangeModelContent(() => updateModel())
});
/**
 * onUnmounted 生命周期钩子
 * 卸载阶段释放编辑器实例避免内存泄漏
 */
onUnmounted(() => {
  instance.value?.dispose();
});
/**
 * watch props.options 监听器
 * 深度监听运行期配置并调用 updateOptions 实时生效
 */
watch(() => props.options, (newOptions) => {
  if (instance.value && newOptions) {
    instance.value.updateOptions(newOptions)
  }
}, {
  deep: true
})

/**
 * watch props.theme 监听器
 * 通过 monaco.editor.setTheme 支持全局主题切换
 */
watch(() => props.theme, (newTheme) => {
  if (newTheme) {
    monaco.editor.setTheme(newTheme)
  }
}, {immediate: true})

/**
 * watch props.language 监听器
 * 通过 setModelLanguage 支持外部语言切换
 */
watch(() => props.language, (newLanguage) => {
  if (instance.value) {
    const model = instance.value.getModel()
    if (model && newLanguage) {
      monaco.editor.setModelLanguage(model, newLanguage)
    }
  }
})

/**
 * defineExpose 暴露方法
 * 暴露 getInstance 供父组件直接访问底层 editor 实例
 */
defineExpose({
  getInstance: () => instance.value,
})

</script>

<template>
  <div ref="container" style="height: 100px"></div>
</template>

<style scoped>
</style>