import type {
  ActivationFunction,
  OutputItem 
} 
from 'vscode-notebook-renderer';
import errorOverlay from 'vscode-notebook-error-overlay';
import { render } from './render';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __webpack_relative_entrypoint_to_root__: string;
declare const scriptUrl: string;

// fix public path for async imports to work
__webpack_public_path__ = new URL(scriptUrl.replace(/[^/]+$/, '') + 
  __webpack_relative_entrypoint_to_root__).toString();

export const activate: ActivationFunction = context => {
  return {
    renderOutputItem(outputItem: OutputItem, element: HTMLElement) {
      errorOverlay.wrap(element, () => {
        const cellOutputContainer: HTMLDivElement = document.createElement('div');
        element.appendChild(cellOutputContainer);
        render({
          container: cellOutputContainer,
          mimeType: outputItem.mime,
          value: outputItem,
          context 
        });
      });
    },
    disposeOutputItem(outputId) {
      // dispose output cell resources if needed;
      // outputId is the cell output being deleted,
      // or undefined when all outputs are being cleared
    }
  };
};
