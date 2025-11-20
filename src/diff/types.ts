import type {editor} from "monaco-editor";

/**
 * DiffInitOptions
 * 仅在 createDiffEditor 阶段读取的初始化配置
 */
export type DiffInitOptions = Omit<editor.IStandaloneDiffEditorConstructionOptions, keyof DiffRuntimeOptions>

/**
 * DiffRuntimeOptions
 * 支持运行期更新的差异对比选项集合
 */
export type DiffRuntimeOptions = editor.IDiffEditorOptions

/**
 * Props
 * 描述 Diff 模式编辑器的初始化及交互配置场景
 */
export interface Props {
    /**
     * initOptions
     * 只在 createDiffEditor 阶段读取的初始配置，例如布局、原始/修改面板比例
     */
    initOptions?: DiffInitOptions

    /**
     * options
     * Diff 编辑器运行期可动态修改的选项集合
     */
    options?: DiffRuntimeOptions

    /**
     * language
     * 控制 original/modified 双模型的语言模式
     * @default 'javascript'
     */
    language?: string

    /**
     * theme
     * 控制组件级主题，底层通过 monaco.editor.setTheme 应用
     * @default 'vs-dark'
     */
    theme?: string

}

