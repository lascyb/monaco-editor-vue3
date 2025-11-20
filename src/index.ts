import "monaco-editor/esm/nls.messages.zh-cn.js"

import MonacoEditor from './edit/index.vue';
import MonacoDiffEditor from './diff/index.vue';

import './environment';
import './keybinding';

export {MonacoEditor, MonacoDiffEditor};
export type {EditorInitOptions, EditorRuntimeOptions} from './edit/types';
export type {DiffInitOptions, DiffRuntimeOptions} from './diff/types';
