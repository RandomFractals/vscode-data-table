import {
  ExtensionContext
} 
from 'vscode';


export function activate(context: ExtensionContext) {
  console.log('data.table: actived');
}

export function deactivate() {
  console.log('data.table: deactivated');
}
