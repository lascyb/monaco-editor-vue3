import type {DefineComponent, ComponentPublicInstance} from 'vue';
import type {editor} from 'monaco-editor';

export type EditorInitOptions = Omit<
  editor.IStandaloneEditorConstructionOptions,
  keyof EditorRuntimeOptions
>;

export type EditorRuntimeOptions = editor.IEditorOptions & editor.IGlobalEditorOptions;

export interface MonacoEditorProps {
  modelValue: string;
  initOptions?: EditorInitOptions;
  options?: EditorRuntimeOptions;
  language?: string;
  theme?: string;
}

export interface MonacoEditorExpose {
  getInstance(): editor.IStandaloneCodeEditor | undefined;
}

export type MonacoEditorInstance = ComponentPublicInstance<
  MonacoEditorProps,
  MonacoEditorExpose
>;

export type MonacoEditorEmits = {
  (event: 'update:modelValue', value: string): void;
};

export declare const MonacoEditor: DefineComponent<MonacoEditorProps, {}, {}, {}, {}, {}, {}, MonacoEditorEmits>;

export type DiffInitOptions = Omit<
  editor.IStandaloneDiffEditorConstructionOptions,
  keyof DiffRuntimeOptions
>;

export type DiffRuntimeOptions = editor.IDiffEditorOptions;

export interface MonacoDiffEditorProps {
  modelValue: string;
  original: string;
  initOptions?: DiffInitOptions;
  options?: DiffRuntimeOptions;
  language?: string;
  theme?: string;
}

export interface MonacoDiffEditorExpose {
  getInstance(): editor.IStandaloneDiffEditor | undefined;
}

export type MonacoDiffEditorInstance = ComponentPublicInstance<
  MonacoDiffEditorProps,
  MonacoDiffEditorExpose
>;

export type MonacoDiffEditorEmits = {
  (event: 'update:modelValue', value: string): void;
  (event: 'update:original', value: string): void;
};

export declare const MonacoDiffEditor: DefineComponent<
  MonacoDiffEditorProps,
  {},
  {},
  {},
  {},
  {},
  {},
  MonacoDiffEditorEmits
>;

export {MonacoEditor, MonacoDiffEditor};

