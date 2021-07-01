/**
 * Import CSS modules.
 * @see https://github.com/css-modules/css-modules
 * Configure it in webpack.config.js
 */
import * as style from './style.css';
import type {RendererContext} from 'vscode-notebook-renderer';

interface IRenderInfo {
  container: HTMLElement;
  mime: string;
  value: any;
  context: RendererContext<unknown>;
}

export function render({container, mime, value}: IRenderInfo) {
  const table: HTMLTableElement = document.createElement('table');
  table.className = 'data-table';
  let data = value.data ? value.data: value;
  for(let i = 0; i < data.length; i++) {
    let child = data[i];
    if (i === 0 ) {
      addHeaders(table, Object.keys(child));
    }
    let row = table.insertRow();
    Object.keys(child).forEach(function(k) {
      let cell = row.insertCell();
      cell.appendChild(document.createTextNode(child[k]));
    });
  }
  console.log(`data.table: mime-type=${mime}`);
  // console.log(JSON.stringify(data, null, 2));
  container.appendChild(table);
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
      // TODO: dispose resources and save renderer state
  });
}

function addHeaders(table: any, keys: string[]) {
  const row = table.insertRow();
  for(let i = 0; i < keys.length; i++ ) {
    let cell = row.insertCell();
    cell.appendChild(document.createTextNode(keys[i]));
  }
}