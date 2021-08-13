import type {
  OutputItem, 
  RendererContext
} from 'vscode-notebook-renderer';
import {OutputLoader} from './outputLoader';
import './styles.css';
const dataSummary = require('./dataSummaryView.js');

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
  console.log(`data.table:mimeType: ${output.mimeType}`);

  // load and parse output data
  const outputLoader: OutputLoader = new OutputLoader(output.value, output.mimeType);
  let data: any = outputLoader.getData();
  
  if (Array.isArray(data)) {
    // create data summary view
    const table = dataSummary.summaryTable(data);

    // add table to cell data output container
    output.container.appendChild(table);
  }
  else {
    // create text output display nodes
    const pre = document.createElement('pre');
    pre.className = 'text-output';
    const code = document.createElement('code');
    if (typeof data !== 'string') {
      // stringify json data
      code.textContent = JSON.stringify(data, null, 2);
    }
    else {
      // show cell output text
      code.textContent = output.value.text();
    }
    pre.appendChild(code);
    output.container.appendChild(pre);
  }
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    // TODO: dispose resources and save renderer state
  });
}
