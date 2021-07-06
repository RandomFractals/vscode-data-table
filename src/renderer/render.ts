import type {RendererContext} from 'vscode-notebook-renderer';
import {csvParse} from 'd3-dsv';
const inputs = require('@observablehq/inputs');

interface IRenderInfo {
  container: HTMLElement;
  mimeType: string;
  value: any;
  context: RendererContext<unknown>;
}

export function render({container, mimeType, value}: IRenderInfo) {
  let data = [];
  console.log(`data.table: mime-type=${mimeType}`);
  switch (mimeType) {
    case 'application/json':
      // get json data
      const jsonData = value.json();
      data = jsonData.data ? jsonData.data: jsonData;
      break;
    case 'text/csv':
      // parse csv data
      let csvData = value.json();
      if (csvData.data) {
        csvData = csvData.data;
      }
      else {
        csvData = value.string();
      }
      data = csvParse(csvData);
      break;
  }

  // create table view
  const table = inputs.table(data, {
    layout: 'auto',
    width: 'auto',
    height: 360,
    rows: lengthOf(data)
  });

  // add table to cell data output container
  container.appendChild(table);
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
