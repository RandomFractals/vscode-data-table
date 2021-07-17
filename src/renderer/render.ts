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
  switch (output.mimeType) {
    case 'application/json':
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
  // console.log('data.table:output', outputData);
  
  // try getting JSON data first
  const objectData = getJsonData(outputData);
  if (objectData !== undefined) {
    return objectData;
  }

  // try parsing text data
  let textData: string = outputData.text();
  if (textData.length > 0) {
    if (textData.startsWith("'") && textData.endsWith("'")) {
      // strip out start/end single quotes from notebook cell output
      textData = textData.substr(1, textData.length-2);
    }
    console.log('data.table:text:', textData.substring(0, Math.min(300, textData.length)), '...');

    // see if text data is in json data format
    const jsonData = getJsonData(textData);
    if (jsonData !== undefined) {
      return jsonData;
    }
    else if (isCsv(textData)) {
      // parse CSV data
      return csvParse(textData);
    }
    else {
      return textData;
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
    if (typeof data === 'string') {
      // try parsing JSON string
      const textData: string = patchJson(data);
      const objectData: any = JSON.parse(textData);
      if (Array.isArray(objectData)) {
        console.log('data.table:format: JSON');
        return objectData;
      }
    }

    // try getting json data object
    // console.log('data.table:json:', data);
    let jsonData: any = data.json();
    if (jsonData.data) {
      // use data object from REST response
      jsonData = jsonData.data;
    }

    if (Array.isArray(jsonData)) {
      console.log('data.table:format: JSON');
      return jsonData;
    }
    
    if (typeof jsonData === 'string' && isCsv(jsonData)) {
      // parse CSV data for JSON response from REST Book
      // see: https://github.com/tanhakabir/rest-book/issues/114
      return csvParse(jsonData);
    }
  }
  catch (error) {
    // console.log('data.table: JSON.parse error:\n', error.message);
  }
  return undefined;
}

/**
 * Patches garbled JSON string.
 * @param data JSON data string.
 * @returns patched up JSON string.
 */
function patchJson(data: string): string {
  // patch garbled json string
  const escapedQuoteRegEx = /\\\\"/g;
  const objectStartRegEx = /"{/g; 
  const objectEndRegEx = /}"/g;
  const xRegEx = /\\xa0/g;
  const newLineRegEx = /\\n/g;
  let textData: string = data.replace(escapedQuoteRegEx, '"');
  textData = textData.replace(objectStartRegEx, '{');
  textData = textData.replace(objectEndRegEx, '}');
  textData = textData.replace(xRegEx, ' ');
  textData = textData.replace(newLineRegEx, '');
  // console.log('data.table:text:', textData.substring(0, Math.min(500, textData.length)), '...');
  return textData;
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
  const maxLines: number = 10;
  const lines: string[] = text.trimEnd().split('\n', maxLines);
  const minRows: number = Math.min(lines.length, maxLines);

  if (lines.length > 0) {
    console.log('data.table:lines:', lines);
    const columns: string[] = lines[0].split(',');
    const columnCount = columns.length;

    if (columnCount > 1) {
      console.log('data.table:columns:', columns);
      // check columns for garbled json
      for (let k =0; k < columnCount; k++) {
        let columnName: string = columns[k];
        if (columnName.startsWith('[') || columnName.startsWith('{')) {
          return false;
        }
      }

      // do naive check for some commas in the first 9 rows
      for (let i = 1; i < minRows; i++) {
        const columnValues: string[] = lines[i].split(',');
        // console.log(`data.table:row[${i}]`, columnValues);
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
