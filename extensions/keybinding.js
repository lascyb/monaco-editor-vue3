import * as monaco from 'monaco-editor'

/**
 * 扩展：自定义键盘快捷键
 * 
 * 此文件展示了如何为 Monaco Editor 添加自定义键盘快捷键
 * 直接导入此文件即可自动配置快捷键
 * 
 * @example
 * ```ts
 * // 在你的应用入口文件中导入
 * import '@lascyb/monaco-editor-vue3/extensions/keybinding'
 * 
 * // 或者复制此代码到你的项目中自定义
 * monaco.editor.addKeybindingRules([
 *   {
 *     keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
 *     command: 'editor.action.formatDocument'
 *   }
 * ])
 * ```
 */

// 添加 Ctrl+Alt+L (Mac: Cmd+Alt+L) 快捷键来格式化文档
monaco.editor.addKeybindingRules([
    {
        keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
        command: 'editor.action.formatDocument'
    }
]);

