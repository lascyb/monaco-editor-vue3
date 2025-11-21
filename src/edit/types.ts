import type {editor} from "monaco-editor";

/**
 * EditorInitOptions
 * 编辑器初始化选项类型，限定仅在 create 阶段使用的配置
 * 适合容器尺寸、初始主题等一次性参数，创建后无法修改
 */
export type EditorInitOptions = Omit<editor.IStandaloneEditorConstructionOptions, keyof EditorRuntimeOptions>

/**
 * EditorRuntimeOptions
 * 编辑器运行时选项类型，支持运行期可增量更新的通用选项集合
 * 通过 watch 监听并调用 updateOptions 实时生效
 */
export type EditorRuntimeOptions = editor.IEditorOptions & editor.IGlobalEditorOptions

/**
 * Props
 * MonacoEditor 组件的属性接口
 * 描述单页 Monaco 编辑器的初始化与运行时配置场景
 */
export interface Props {
    /**
     * initOptions
     * 创建实例时一次性注入的底层配置，适合容器尺寸、初始主题等一次性参数
     */
    initOptions?: EditorInitOptions
    /**
     * options
     * 运行期可变更的编辑器选项，通过 watch 同步调用 updateOptions 实时生效
     */
    options?: EditorRuntimeOptions

    /**
     * language
     * 指定编辑器语言模式，便于调用 setModelLanguage 动态切换
     * @default undefined
     */
    language?: string

    /**
     * theme
     * 控制组件级主题，底层通过 monaco.editor.setTheme 应用
     * @default 'vs-dark'
     */
    theme?: string
}

