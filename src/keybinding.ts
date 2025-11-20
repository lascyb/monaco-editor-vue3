import * as monaco from 'monaco-editor'

monaco.editor.addKeybindingRules([
    {
        keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
        command: 'editor.action.formatDocument'
    }
]);

