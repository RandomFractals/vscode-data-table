import {
  ExtensionContext,
  Disposable,
	QuickPickItem,
  ViewColumn,
  Uri,
  commands,
  window,
  workspace
}
from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as config from './config';
import * as constants from './constants';

let _context: ExtensionContext;

export function registerCommands(context: ExtensionContext) {
  _context = context;
	registerCommand(constants.NotebookExamplesCommand, createNotebookExamplesCommand);
}

function registerCommand(commandName: string, callback: (...args: any[]) => any, thisArg?: any): Disposable {
  const command: Disposable = commands.registerCommand(commandName, callback);
  _context.subscriptions.push(command);
  return command;
}

/**
 * Displays buil-in Data Table Notebook Examples Quick Pick list.
 */
 async function createNotebookExamplesCommand(): Promise<void> {
  const notebookQuickPickItems: Array<QuickPickItem> = [];
  config.notebookExamples.forEach(notebook => notebookQuickPickItems.push({
		label: `$(notebook) ${notebook.name}`,
		description: notebook.type,
		detail: notebook.file
	}));
	const selectedNotebook: QuickPickItem | undefined = 
		await window.showQuickPick(notebookQuickPickItems, {canPickMany: false});
	if (selectedNotebook) {
		const notebookUrl: string | undefined = selectedNotebook.detail;
    const extensionPath: string = _context.asAbsolutePath('./');
		if (notebookUrl) {
			const notebookUri: Uri =  Uri.file(path.join(extensionPath, notebookUrl));
			// open data table example notebook
			commands.executeCommand(constants.VSCodeOpenCommand, notebookUri);	
		}
	}
}
