"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const function_documentation = require("../src/jess.json");
vscode.languages.registerHoverProvider('jess', {
    provideHover(document, position, token) {
        const range = document.getWordRangeAtPosition(position, /[^\(\) \[\]\{\}"\r\n]+/);
        if (range !== undefined) {
            const word = document.getText(range);
            if (function_documentation.hasOwnProperty(word)) {
                let contents = [];
                contents.push("## " + function_documentation[word].title.replace(/</g, "\\<").replace(/>/g, "\\>"));
                if (function_documentation[word].hasOwnProperty("arguments")) {
                    contents.push("**Arguments:** " + function_documentation[word].arguments);
                }
                if (function_documentation[word].hasOwnProperty("returns")) {
                    contents.push("**Returns:** " + function_documentation[word].returns);
                }
                contents.push(function_documentation[word].description);
                return { contents: contents };
            }
        }
        return;
    }
});
//# sourceMappingURL=jess.js.map