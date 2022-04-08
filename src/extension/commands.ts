import {
  ExtensionContext,
  Disposable,
	QuickPickItem,
  Uri,
  commands,
  window
}
from 'vscode';

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
    const extensionUri: Uri = _context.extensionUri;
		if (notebookUrl) {
			const notebookUri: Uri =  Uri.joinPath(extensionUri, notebookUrl);
			// open data table example notebook
			console.log(`${constants.ExtensionId}: loading notebook example: ${notebookUri.toString(true)}`);
			commands.executeCommand(constants.VSCodeOpenCommand, notebookUri);
		}
	}
}
