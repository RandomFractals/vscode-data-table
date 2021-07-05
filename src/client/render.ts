import type {RendererContext} from 'vscode-notebook-renderer';
const inputs = require('@observablehq/inputs');

interface IRenderInfo {
  container: HTMLElement;
  mime: string;
  value: any;
  context: RendererContext<unknown>;
}

export function render({container, mime, value}: IRenderInfo) {
  const data = value.data ? value.data: value;
  const table = inputs.table(data, {
    layout: 'auto',
    width: 'auto',
    height: 360,
    rows: lengthOf(data)
  });
  console.log(`data.table: mime-type=${mime}`);
  container.appendChild(table);
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
      // TODO: dispose resources and save renderer state
  });
}


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
