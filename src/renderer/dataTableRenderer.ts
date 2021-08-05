import type {
  OutputItem, 
  RendererContext
} from 'vscode-notebook-renderer';
import { OutputLoader } from './outputLoader';
import './styles.css';
const htl = require('htl');
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

  if (Array.isArray(data)) {
    // create data table view
    const table = inputs.table(data, {
      layout: 'auto',
      width: 'auto',
      height: 360,
    });

    // add table to cell data output container
    output.container.appendChild(table);
  }
  else {
    // output text in pre/code tags
    output.container.appendChild(htl.html`<pre class="text-output"><code>${data}</code></pre>`);
  }
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    // TODO: dispose resources and save renderer state
  });
}
