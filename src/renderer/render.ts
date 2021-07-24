import type {
  RendererContext,
  OutputItem 
} 
from 'vscode-notebook-renderer';
import {OutputLoader} from './outputLoader';
const aq = require('arquero');
const inputs = require('@observablehq/inputs');

/**
 * Notebook cell output render info.
 */
interface IRenderInfo {
  container: HTMLElement;
  mimeType: string;
  value: OutputItem;
  context: RendererContext<unknown>;
}

/**
 * Renders notebook cell output.
 * @param output Notebook cell output info to render.
 */
export function render(output: IRenderInfo) {
  let data: any;
  const outputLoader: OutputLoader = new OutputLoader(output.value, output.mimeType);
  console.log(`data.table:mimeType: ${output.mimeType}`);
  switch (output.mimeType) {
    case 'application/json':
    case 'text/csv':
    case 'text/plain':
    case 'application/vnd.code.notebook.stdout':
      data = outputLoader.getData();
      break;
  }

  // add data table view styles
  addStyles(document);

  if (Array.isArray(data)) {
    // create data table view
    const table = inputs.table(data, {
      layout: 'auto',
      width: 'auto',
      height: 360,
      rows: lengthOf(data)
    });

    // add table to cell data output container
    output.container.appendChild(table);
  }
  else {
    // output text in pre/code tags
   output.container.innerHTML = `<pre 
    style="max-height: 300px; white-space: pre-wrap; tab-size: 2; overflow: auto;">
      <code style="display: block; white-space: pre-wrap;">${data}</code>
    </pre>`;
  }
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    // TODO: dispose resources and save renderer state
  });
}

/**
 * Gets data length.
 * @param data Data array, set, map, or arquero table.
 * @returns Dataset length/size or row count.
 */
 function lengthOf(data: any) {
  if (typeof data.length === 'number') {
    // array or array-like
    return data.length;
  }

  if (typeof data.size === 'number') {
    // map or set
    return data.size; 
  }

  if (typeof data.numRows === 'function') {
    // arquero
    return data.numRows();
  }

  return 0;
}

function addStyles(document: HTMLDocument): HTMLStyleElement {
  const styles: HTMLStyleElement = document.createElement('style');
  document.head.appendChild(styles);
  styles.textContent = `
  .data-table {
    max-width: 100%;
    background-color: var(--vscode-editor-background);
    border: 1px solid var(--vscode-panel-border);
  }

  .data-table form {
    margin: 0px !important;
  }

  .data-table form table thead th {
    background-color: var(--vscode-editor-background) !important;
  }

  thead th {
    box-shadow: 0 1px 0 var(--vscode-panel-border) !important;
  }
  
  th {
    text-align: left !important;
  }
  `;
  
  return styles;
}
