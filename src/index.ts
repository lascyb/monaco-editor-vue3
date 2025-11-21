/**
 * @lascyb/monaco-editor-vue3
 * Monaco Editor 的 Vue 3 组件封装
 */

import MonacoEditor from './edit/index.vue';
import MonacoDiffEditor from './diff/index.vue';

export {MonacoEditor, MonacoDiffEditor};
export type {EditorInitOptions, EditorRuntimeOptions} from './edit/types';
export type {DiffInitOptions, DiffRuntimeOptions} from './diff/types';
