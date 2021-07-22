import type {OutputItem} from 'vscode-notebook-renderer';
import {csvParse} from 'd3-dsv';
const aq = require('arquero');

export class OutputLoader {

  constructor (private outputData: OutputItem, private mimeType: string) {

  }

    
  /**
   * Gets data output.
   */
  getData(): any {
    // console.log('data.table:output', outputData);
    
    // try getting JSON data first
    const objectData = this.getJsonData(this.outputData);
    if (objectData !== undefined) {
      return objectData;
    }

    // try parsing text data
    let textData: string = this.outputData.text();
    if (textData.length > 0) {
      if (textData.startsWith("'") && textData.endsWith("'")) {
        // strip out start/end single quotes from notebook cell output
        textData = textData.substr(1, textData.length-2);
      }
      console.log('data.table:text:', textData.substring(0, Math.min(300, textData.length)), '...');

      // see if text data is in json data format
      const jsonData = this.getJsonData(textData);
      if (jsonData !== undefined) {
        return jsonData;
      }
      else if (this.isCsv(textData)) {
        // parse CSV data
        return csvParse(textData);
      }
      else {
        return textData;
      }
    }

    // TODO: try loading binary Apache Arrow data
    /*
    const dataArray = this.outputData.data();
    if (dataArray.length() > 0 ) {
      console.log(`data.table:dataType: ${dataArray.constructor}`);
      return aq.fromArrow(dataArray);
    }*/
    
    return this.outputData;
  }

  /**
   * Gets JSON data array, JSON object string, 
   * CSV rows data array, or undefined 
   * for plain text and binary data types.
   * @param data Notebook output data value.
   */
  getJsonData(data: any): any {
    // console.log('data.table:json:', data);
    try {
      if (typeof data === 'string') {
        // try parsing JSON string
        const textData: string = this.patchJson(data);
        const objectData: any = JSON.parse(textData);
        if (Array.isArray(objectData)) {
          console.log('data.table:format: JSON array');
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

      if (jsonData.features) {
        console.log('data.table:format: GeoJSON');
        jsonData = this.flattenGeoData(jsonData);
      }

      if (Array.isArray(jsonData)) {
        console.log('data.table:format: JSON array');
        return jsonData;
      }

      if (typeof jsonData === 'string' && this.isCsv(jsonData)) {
        // parse CSV data for JSON response from REST Book
        // see: https://github.com/tanhakabir/rest-book/issues/114
        return csvParse(jsonData);
      }
    }
    catch (error) {
      console.log('data.table: JSON.parse error:\n', error.message);
    }
    return undefined;
  }

  /**
   * Patches garbled JSON string.
   * @param data JSON data string.
   * @returns Patched up JSON string.
   */
  patchJson(data: string): string {
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
   * Flattens geo data for tabular data display.
   * @param data Geojson or topojson data object.
   */
  flattenGeoData(data: any): any {
    if (data.features) {
      const features = data.features.map((feature: any) => {
        let geometry = {} as Record<string, any>;
        Object.keys(feature?.geometry).forEach(key => {
          geometry[`geometry.${key}`] = feature.geometry[key];
        });
        let properties = {} as Record<string, any>;
        Object.keys(feature?.properties).forEach(key => {
          properties[`${key}`] = feature.properties[key];
        });
        const {geometry: g, properties: p, ...restOfKeys} = feature;
        return {...restOfKeys, ...properties, ...geometry};
      });
      // console.log('data.table:geoData:', JSON.stringify(features, null, 2));
      return features;
    }
    return data;
  }

  /**
   * Checks if text content is in CSV format.
   * @param text Text content to check.
   */
  isCsv(text: string): boolean {
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

}
