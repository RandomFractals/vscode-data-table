import {
  ExtensionContext
}
from 'vscode';
import {registerCommands} from './commands';
import * as constants from './constants';

export function activate(context: ExtensionContext) {
  console.log(`${constants.ExtensionId}: activated`);

  // register data table notebook commands
	registerCommands(context);
}

export function deactivate() {
  console.log(`${constants.ExtensionId}: deactivated`);
}
