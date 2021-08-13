import type {OutputItem} from 'vscode-notebook-renderer';
import {csvParse} from 'd3-dsv';
const aq = require('arquero');
const xmlParser = require('fast-xml-parser');

/**
 * OutputLoader loads data from notebook cell output item.
 */
export class OutputLoader {

  /**
   * Creates new OutputLoader instance.
   * @param outputData Notebook cell output item.
   * @param mimeType Notebook cell output mime type.
   */
  constructor (private outputData: OutputItem, private mimeType: string) {
  }

    
  /**
   * Gets data output.
   */
  getData(): any {
    // try getting JSON data first
    const objectData = this.getJsonData(this.outputData);
    if (objectData !== undefined) {
      if (objectData.features) {
        console.log('data.table:format: GeoJSON');
        return this.flattenGeoData(objectData);
      }
      return objectData;
    }

    // try parsing text data
    let textData: string = this.outputData.text();
    if (textData.length > 0) {
      // console.log('data.table:text:', textData.substring(0, Math.min(80, textData.length)), '...');
      // see if text data is in json data format
      const jsonData = this.getJsonData(textData);
      if (jsonData !== undefined) {
        if (jsonData.features) {
          console.log('data.table:format: GeoJSON');
          return this.flattenGeoData(jsonData);
        }  
        return jsonData;
      }
      else if (textData.startsWith('<?xml version="1.0"')) {
        // parse XML data
        return this.xmlParse(textData);
      }
      else if (this.isCsv(textData)) {
        // parse CSV data
        return csvParse(textData);
      }
      else if (textData !== '{}' && !textData.startsWith('<Buffer ')) { // empty object or binary data
        return textData;
      }
    }

    // TODO: try loading binary Apache Arrow data
    // console.log('data.table:output', this.outputData);
    const dataArray: Uint8Array = this.outputData.data();
    console.log(dataArray);
    if (dataArray.length > 0 ) {
      console.log(`data.table:dataType: ${dataArray.constructor}`);
      return aq.fromArrow(dataArray);
    }
    
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
        let objectData: any = JSON.parse(textData);
        
        if (objectData.data) {
          // use data object from REST response
          objectData = objectData.data;
        }

        if (Array.isArray(objectData)) {
          console.log('data.table:format: JSON array');
          return objectData;
        }
        else {
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
        console.log('data.table:format: JSON array');
        return jsonData;
      }
      else {
        console.log('data.table:format: JSON');
      }

      if (typeof jsonData === 'string') {
        if (this.isCsv(jsonData)) {
          // parse CSV data for JSON response from REST Book
          // see: https://github.com/tanhakabir/rest-book/issues/114
          return csvParse(jsonData);
        }
        else if (jsonData.startsWith('<?xml version="1.0"')) {
          // try to parse XML data as the last resort
          return this.xmlParse(jsonData);
        }    
      }
    }
    catch (error: any) {
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
    if (textData.startsWith("'") && textData.endsWith("'")) {
      // strip out start/end single quotes from notebook cell output
      textData = textData.substr(1, textData.length-2);
    }
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
      // console.log('data.table:lines:', lines);
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

  /**
   * Parses xml data.
   * @param xml Xml data string.
   */
  xmlParse(xml: string): any {
    let jsonData = {};
    const xmlParserOptions = {
      attributeNamePrefix : '',
      textNodeName : 'value',
      ignoreAttributes : false,
      ignoreNameSpace : true,
      allowBooleanAttributes : true,
      parseNodeValue : true,
      parseAttributeValue : true,
      trimValues: true,
      // parseTrueNumberOnly: false,
      // arrayMode: false, //"strict"
    };
    try {
      jsonData = xmlParser.parse(xml, xmlParserOptions); // , true); // validate xml
      console.log('data.table:format: XML');
      // console.log(JSON.stringify(jsonData, null, 2));
      for (let propertyValue of Object.values(jsonData)) {
        const child: any = propertyValue;
        for (let childPropertyValue of Object.values(child)) {
          if (Array.isArray(childPropertyValue)) {
            // return the first array property for now
            return childPropertyValue;
          }
        }
      }
    }
    catch(error: any) {
      console.log('data.table: XML parse error:\n', error.message);
    }
    return jsonData;
  }
}
