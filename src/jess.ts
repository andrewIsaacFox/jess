import * as vscode from 'vscode';
import * as function_documentation from '../src/jess.json';

vscode.languages.registerHoverProvider('jess', {
    provideHover(document, position, token) {
        const range = document.getWordRangeAtPosition(position, /[^\(\) \[\]\{\}"\r\n]+/);

        if (range !== undefined) {
            const word: string = document.getText(range);
            if (function_documentation.hasOwnProperty(word)) {
                let contents: string[] = [];
                contents.push("## " + (function_documentation as any)[word].title.replace(/</g, "\\<").replace(/>/g, "\\>"));
                if ((function_documentation as any)[word].hasOwnProperty("arguments")) {
                    contents.push("**Arguments:** " + (function_documentation as any)[word].arguments);
                }
                if ((function_documentation as any)[word].hasOwnProperty("returns")) {
                    contents.push("**Returns:** " + (function_documentation as any)[word].returns);
                }
                contents.push((function_documentation as any)[word].description);
                return {contents: contents}
            }
        }

        return;
    }
})
