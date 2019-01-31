// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.bcemsume.chsarpToTS', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selection = editor.selection;
		let text = editor.document.getText(selection);


		editor.edit(builder => builder.replace(selection, replace(text)))

		vscode.window.showInformationMessage(text);

	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


function replace(str: string): string {
	let result = '';
	str.split('\n').forEach(element => {
		if(element.indexOf('class') > -1)
		{
			result += element.trim().replace('public class','export class').replace('class','export class');
		}else if  (element.trim() === '{') {
			result += element;
		}else if (element.trim().indexOf('{get;set;}'))
		{
			result += element.replace('{get;set;}','');
		}
	});

	return result;
}