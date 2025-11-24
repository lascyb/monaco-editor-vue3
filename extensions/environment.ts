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
if (typeof self !== 'undefined' && !self.MonacoEnvironment) {
    /**
     * 通过动态 import 创建 Worker
     * 使用 ?worker 后缀，构建工具（如 Vite）会自动处理
     */
    const createWorkerFromImport = async (importFn: () => Promise<any>): Promise<Worker> => {
        const workerModule = await importFn();
        // 动态 import 返回的 worker 模块，通常需要从 default 导出获取
        const WorkerClass = workerModule.default || workerModule;

        // 如果返回的是 Worker 类，需要实例化
        if (typeof WorkerClass === 'function') {
            return new WorkerClass();
        }
        // 如果已经是 Worker 实例，直接返回
        if (WorkerClass instanceof Worker) {
            return WorkerClass;
        }
        // 如果是 URL 字符串，创建 Worker
        if (typeof WorkerClass === 'string') {
            return new Worker(WorkerClass, { type: 'module' });
        }
        
        throw new Error('Invalid worker module format');
    };

    self.MonacoEnvironment = {
        getWorker(_, label) {
            // 检查是否配置了自定义 worker 导入函数
            if (typeof window !== 'undefined' && (window as any).__MONACO_WORKER_IMPORTER__) {
                const customImporter = (window as any).__MONACO_WORKER_IMPORTER__;
                if (typeof customImporter === 'function') {
                    const result = customImporter(label);
                    return result instanceof Promise ? result : Promise.resolve(result);
                }
            }

            // 使用动态 import 导入 worker
            // 构建工具（如 Vite）会自动处理 ?worker 后缀
            switch (label) {
                case 'json':
                    return createWorkerFromImport(() => 
                        import('monaco-editor/esm/vs/language/json/json.worker?worker' as any)
                    );
                case 'css':
                case 'scss':
                case 'less':
                    return createWorkerFromImport(() => 
                        import('monaco-editor/esm/vs/language/css/css.worker?worker' as any)
                    );
                case 'html':
                case 'handlebars':
                case 'razor':
                    return createWorkerFromImport(() => 
                        import('monaco-editor/esm/vs/language/html/html.worker?worker' as any)
                    );
                case 'typescript':
                case 'javascript':
                    return createWorkerFromImport(() => 
                        import('monaco-editor/esm/vs/language/typescript/ts.worker?worker' as any)
                    );
                default:
                    return createWorkerFromImport(() => 
                        import('monaco-editor/esm/vs/editor/editor.worker?worker' as any)
                    );
            }
        }
    };
}
