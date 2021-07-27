import type {
  ActivationFunction,
  OutputItem 
} from 'vscode-notebook-renderer';
import errorOverlay from 'vscode-notebook-error-overlay';
import {render} from './dataSummaryRenderer';

export const activate: ActivationFunction = context => {
  return {
    renderOutputItem(outputItem: OutputItem, element: HTMLElement) {
      errorOverlay.wrap(element, () => {
        const cellOutputContainer: HTMLDivElement = document.createElement('div');
        cellOutputContainer.className = 'data-summary';
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
