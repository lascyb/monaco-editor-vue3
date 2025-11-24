import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

/**
 * configureMonacoEnvironment 配置 Monaco Editor 的 Worker 环境
 * 直接导入此文件即可自动配置，用于启用语法高亮、代码补全等语言服务功能
 *
 * @example
 * ```ts
 * // 在应用入口文件中导入
 * import '@lascyb/monaco-editor-vue3/extensions/environment'
 * ```
 *
 * 注意：如果已经存在 MonacoEnvironment，则不会覆盖现有配置
 */
if (typeof window !== 'undefined' && !self.MonacoEnvironment) {
    self.MonacoEnvironment = {
        getWorker(_, label) {
            switch (label) {
                case 'json':
                    return new jsonWorker();
                case 'css':
                case 'scss':
                case 'less':
                    return new cssWorker();
                case 'html':
                case 'handlebars':
                case 'razor':
                    return new htmlWorker();
                case 'typescript':
                case 'javascript':
                    return new tsWorker();
                default:
                    return new editorWorker(); // Default for plain text and other languages
            }
        }
    };
}
