import type {
  RendererContext,
  OutputItem 
} 
from 'vscode-notebook-renderer';
import {csvParse} from 'd3-dsv';
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
  let data = [];
  console.log(`data.table: mime-type=${output.mimeType}`);
  switch (output.mimeType) {
    case 'application/json':
      const jsonData = output.value.json();
      data = jsonData.data ? jsonData.data: jsonData;
      if (typeof data === 'string') {
        console.log('data.table: data-type=Text');
        data = csvParse(data);
      }
      break;
    case 'text/csv':
    case 'text/plain':
      // assume CSV data for now
      // TODO: add TSV data prasing later
      const csvData = output.value.text();
      data = csvParse(csvData);
      break;
    case 'application/vnd.code.notebook.stdout':
      data = getData(output.value);
      break;
  }

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

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    // TODO: dispose resources and save renderer state
  });
}

/**
 * Gets data output.
 * @param output Output data.
 */
function getData(outputData: any): any {
  // try getting JSON data first
  const objectData = getJsonData(outputData);
  if (objectData && Array.isArray(objectData)) {
    console.log('data.table: data-type=JSON');
    return objectData;
  }

  // try parsing CSV data
  const textData: string = outputData.text();
  if (textData.length > 0) {
    console.log('data.table: data-type=Text');
    return csvParse(textData);
  }
        
  // try loading Apache Arrow data
  const dataArray = outputData.data();
  if (dataArray.size() > 0 ) {
    console.log(`data.table: data-type=${dataArray.constructor}`);
    return aq.fromArrow(dataArray);
  }
  
  return outputData;
}

/**
 * Gets output data JSON object or undefined 
 * for string and binary data types.
 * @param data Notebook output data value.
 */
function getJsonData(data: any): any {
  try {
    // try getting json data object
    let objectData: any = data.json();
    if (typeof objectData === 'string') {
      // try to parse json data
      objectData = JSON.parse(objectData);
    }
    return objectData;
  }
  catch (error) {
    // console.log('data.table: JSON.parse error:\n', error.message);
  }
  return undefined;
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
