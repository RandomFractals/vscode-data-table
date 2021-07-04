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
  const table = inputs.table(data);
  console.log(`data.table: mime-type=${mime}`);
  container.appendChild(table);
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
      // TODO: dispose resources and save renderer state
  });
}
