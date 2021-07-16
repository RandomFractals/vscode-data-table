import type {
  RendererContext,
  OutputItem 
} 
from 'vscode-notebook-renderer';
import * as style from './style.css';
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
  let data: any;
  console.log(`data.table:mimeType: ${output.mimeType}`);
  console.log(output.value);
  switch (output.mimeType) {
    case 'application/json':
      const jsonData = output.value.json();
      data = jsonData.data ? jsonData.data: jsonData;
      if (typeof data === 'string') {
        data = getData(output.value);
      }
      break;
    case 'text/csv':
    case 'text/plain':
    case 'application/vnd.code.notebook.stdout':
      data = getData(output.value);
      break;
  }

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
    const pre = document.createElement('pre');
    pre.classList.add(style.json);
    const code = document.createElement('code');
    code.textContent = data;
    pre.appendChild(code);
    output.container.appendChild(pre);
  }
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
  if (objectData !== undefined) {
    return objectData;
  }

  // try parsing text data
  const textData: string = outputData.text();
  // console.log('data.table:text:', textData);
  if (textData.length > 0) {
    // see if text data is in json data format
    const jsonData = getJsonData(textData);
    if (jsonData !== undefined) {
      return jsonData;
    }
    else if (isCsv(textData)) {
      // parse CSV data
      return csvParse(textData);
    }
  }

  // TODO: try loading binary Apache Arrow data
  const dataArray = outputData.data();
  if (dataArray.length() > 0 ) {
    console.log(`data.table:dataType: ${dataArray.constructor}`);
    return aq.fromArrow(dataArray);
  }
  
  return outputData;
}

/**
 * Gets JSON data array, JSON object string, 
 * CSV rows data array, or undefined 
 * for plain text and binary data types.
 * @param data Notebook output data value.
 */
function getJsonData(data: any): any {
  // console.log('data.table:json:', data);
  try {
    let objectData: any;
    if (typeof data === 'string') {
      objectData = JSON.parse(data);
    }
    else {
      // try getting json data object
      objectData = data.json();
    }

    let jsonData: any = objectData;
    if (objectData.data) {
      // use data object from REST response
      jsonData = objectData.data;
    }

    console.log('data.table:format: JSON');
    if (Array.isArray(jsonData)) {
      return jsonData;
    }
    else if (typeof jsonData === 'string' && isCsv(jsonData)) {
      // parse CSV data for JSON response from REST Book
      // see: https://github.com/tanhakabir/rest-book/issues/114
      return csvParse(jsonData);
    }
    else if (jsonData !== undefined) {
      // stringiy for raw json object display
      return JSON.stringify(jsonData, null, 2);
    }
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

/**
 * Checks if text content is in CSV format.
 * @param text The text content to check.
 */
function isCsv(text: string): boolean {
  if (text === undefined || text.length === 0) {
    return false;
  }

  // get text lines
  const lines: string[] = text.split('\n');
  if (lines.length > 0) {
    const columns: string[] = lines[0].split(',');
    const columnCount = columns.length;
    if (columnCount > 0) {
      // do naive check for some commas in the first 10 rows
      for (let i = 1; i < 10; i++) {
        const columnValues: string[] = lines[i].split(',');
        if (columnValues.length < columnCount) {
          return false;
        }
      }
      console.log('data.table:format: CSV');
      return true;
    }
  }

  return false;
}
