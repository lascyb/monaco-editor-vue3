import type {editor} from "monaco-editor";

/**
 * DiffInitOptions
 * 差异编辑器初始化选项类型，仅在 createDiffEditor 阶段读取的初始化配置
 * 例如布局、原始/修改面板比例等一次性参数
 */
export type DiffInitOptions = Omit<editor.IStandaloneDiffEditorConstructionOptions, keyof DiffRuntimeOptions>

/**
 * DiffRuntimeOptions
 * 差异编辑器运行时选项类型，支持运行期更新的差异对比选项集合
 * 通过 watch 监听并调用 updateOptions 实时生效
 */
export type DiffRuntimeOptions = editor.IDiffEditorOptions

/**
 * Props
 * MonacoDiffEditor 组件的属性接口
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

