// Loosely based on: https://observablehq.com/@observablehq/summary-table
/* eslint-disable curly */
import {Plot, d3} from '@observablehq/plot';

const htl = require('htl');
const html = htl.html;

const NUMBER = 'number';
const DATE = 'date';
const ORDINAL = 'ordinal';
const CONTINUOUS = 'continuous';
const COUNT = 'count';
const MEAN = 'mean';
const SUMMARY = 'summary';
const UNLABELED = 'unlabeled';

const ABSOLUTE = 'absolute';
const INLINE_BLOCK = 'inline-block';
const START = 'start';
const TOP = 'top';
const VISIBLE = 'visible';
const NONE = 'none';

const CATEGORY = ' category';
const CATEGORIES = ' categories';

const BLUES = 'blues';
const DARK_BLUE = 'darkblue';
const BLACK = 'black';

const percentFormat = d3.format('.1%');

getType = (data, column) => {
  for (const d of data) {
    const value = d[column];
    if (value === null) continue;
    if (typeof value === NUMBER) return CONTINUOUS;
    if (value instanceof Date) return DATE;
    return ORDINAL;
  }
  // if all are null, return ordinal
  return ORDINAL;
};

// bars color map
const colorMap = new Map([
  [ORDINAL, 'rgba(78, 121, 167, 1)'],
  [CONTINUOUS, 'rgba(242, 142, 44, 1)'],
  [DATE, 'rgba(225,87,89, 1)']
].map(d => {
  const color = d3.color(d[1]);
  const colorCopy = Object.assign({}, color); //_.clone(color);
  colorCopy.opacity = .6;
  return [d[0], {color: color.formatRgb(), brighter: colorCopy.formatRgb()}];
}));

/**
 * Creates summary table document fragment for display.
 */
export function summaryTable(data, {label = SUMMARY} = {}) {
  const sample = data[0] || {};
  const columns = data.columns || Object.keys(sample);
  let value = [];

  // create summary card and track data shape
  const summaryCard = SummaryCard(data, label);
  value.rowCount = summaryCard.value.rowCount;
  value.columnCount = summaryCard.value.columnCount;
  value.columns = columns;

  // compose summary table fragment
  const dataSummaryElement = htl.html`<div style="display: inline-block; vertical-align: top;">${summaryCard}</div>
      <div style="display: inline-block;">
        <table style="vertical-align: middle; display: block; overflow-x: auto; max-width: ${width}px;">
          <thead style="z-index: -999;">
          <th>Column</th>
          <th style="min-width: 250px">Snapshot</th>
          <th>Missing</th>
          <th>Mean</th>
          <th>Median</th>
          <th>SD</th>
        </thead>
      ${columns.map(d => {
        const columnElement = SummarizeColumn(data, d);
        // get the value from the element
        value.push(columnElement.value);
        return columnElement;
      })}
    </table>
  </div>`;
  dataSummaryElement.value = value;
  return dataSummaryElement;
};

/**
 * Data summary card.
 */
SummaryCard = (data, label = SUMMARY) => {  
  // compute column data values
  const sample = data[0] || {};
  const columns = data.columns || Object.keys(sample);
  const columnData = columns.map(d => {
    return {
      label: d === '' ? UNLABELED : d, 
      type: getType(data, d)
    };
  });
  const columnCount = columnData.length;
  const rowCount = data.length;
  
  // create header row plot
  const headerRowPlot = addTooltips(
    Plot.cellX(columnData,
      {fill:d => colorMap.get(d.type).color, title: d => `${d.label}\n(${d.type})`}
    ).plot({
       x: {axis: null},
       width: 100,
       height: 10,
       color: {
         domain:[...colorMap.values()].map(d => d.color)
       }, 
       style: {
         overflow: VISIBLE
       }
    }), 
    {stroke: BLACK, "stroke-width": '3px'}
  );
  
  // crate columns plot
  const columnsPlot = Plot.cellX(columnData, {fill: d => colorMap.get(d.type).color, fillOpacity: .3}).plot({
    x:{axis: null},
    width: 100,
    height: 80,
    color: {
       domain:[...colorMap.values()].map(d => d.color)
    }}
  );
  
  const arrowStyles = {
    display: INLINE_BLOCK,
    verticalAlign: TOP,
    transformOrigin: '0 0',
    transform: 'rotate(90deg)',
    marginTop: '20px',
    position: ABSOLUTE,
    left: '114px',
    top: '54px'
  };
  
  const summaryCardElement = htl.html`<div style="font-family: sans-serif; font-size: 13px; margin-right: 10px;">
      <span style="font-size: 1.3em">${label}</span>
      <div>${d3.format(',.0f')(columnCount)} ⟶</div>
      ${headerRowPlot}
      <span style="display: inline-block">${columnsPlot}</span>
      <span style="display: inline-block; vertical-align: top;">${d3.format(',.0f')(rowCount)}<br/></span>
      <span style=${arrowStyles}>⟶</span>
    </div>`;
  
  summaryCardElement.value = {rowCount, columnCount};
  return summaryCardElement;
};

SmallStack = (categoryData, col) => {
  // horizontal stacked bar
  const label = categoryData.length === 1 ? CATEGORY : CATEGORIES;
  return addTooltips(
    Plot.barX(categoryData, {x: COUNT, fill: col, y: 0, 
      title: d => d[col] + '\n' + percentFormat(d.pct)}).plot({
      color: {scheme: BLUES},
      marks:[
        Plot.text([0,0], {x: 0, dy: 13, text:d => d3.format(',.0f')(categoryData.length) + `${label}`})
      ], 
      style: {
        paddingTop: '0px',
        paddingBottom: '15px',
        textAnchor: START,
        overflow: VISIBLE
      }, 
      x: {axis: null},
      color: {
        domain: categoryData.map(d => d[col]), 
        scheme: BLUES, 
        reverse: true
      },
      height: 30,
      width: 205,
      y: {
        axis: null, 
        range: [30, 3]
      }, 
      }
    ), {fill: DARK_BLUE});
};


Histogram = (data, col, type = CONTINUOUS) => {
  // compute color + mean
  const barColor = colorMap.get(type).brighter;
  const mean = d3.mean(data, d => d[col]);
  
  // formatter for the mean
  const extent = d3.extent(data, d => d[col]);
  const format = type === DATE ? getDateFormat(extent):d3.format(',.0f');
  const rules = [{label: MEAN, value: mean}];

  return addTooltips(
    Plot.plot({
      height: 55,
      width: 240,
      style: {
        display: INLINE_BLOCK
      },
      x: {
        label: '',
        ticks: extent,
        tickFormat: format
      }, 
      y: {
        axis: null
      },     
      marks: [
        Plot.rectY(data, 
          Plot.binX({y: COUNT, 
            title: (elems) => {
              // compute range for the elements
              const barExtent = d3.extent(elems, d => d[col]);
              const barFormat = type === DATE ? getDateFormat(barExtent):d3.format(',.0f');
              return `${elems.length} rows\n[${barFormat(barExtent[0])} to ${barFormat(barExtent[1])}]`;
            }
          }, 
          {x: col, fill: barColor})
        ), 
        Plot.ruleY([0]), 
        Plot.ruleX(rules, {x: 'value', strokeWidth: 2, title:d => `${d.label} ${col}: ${format(d.value)}`})
      ], 
      style:{
        marginLeft: -17,
        background: NONE,
        overflow: VISIBLE
      }
    }), {opacity: 1, fill: colorMap.get(type).color});
};


// use UTC date format extent offset
getDateFormat = (extent) => {
  const formatMillisecond = d3.utcFormat('.%L'),
      formatSecond = d3.utcFormat(':%S'),
      formatMinute = d3.utcFormat('%I:%M'),
      formatHour = d3.utcFormat('%I %p'),
      formatDay = d3.utcFormat('%a %d'),
      formatWeek = d3.utcFormat('%b %d'),
      formatMonth = d3.utcFormat('%B'),
      formatYear = d3.utcFormat('%Y');

  // test the difference between extent, offset by 1
  return extent[1] > d3.utcYear.offset(extent[0], 1)? formatYear :
    extent[1] > d3.utcMonth.offset(extent[0], 1)? formatMonth :
    extent[1] > d3.utcWeek.offset(extent[0], 1) ? formatWeek :
    extent[1] > d3.utcDay.offset(extent[0], 1) ? formatDay :
    extent[1] > d3.utcHour.offset(extent[0], 1) ? formatHour :
    extent[1] > d3.utcMinute.offset(extent[0], 1) ? formatMinute :
    extent[1] > d3.utcSecond.offset(extent[0], 1) ? formatSecond :
    extent[1] > d3.utcMillisecond.offset(extent[0], 1) ? formatMillisecond :
    formatDay;
};

function dateFormat(date) {
  const formatMillisecond = d3.timeFormat('.%L'),
    formatSecond = d3.timeFormat(':%S'),
    formatMinute = d3.timeFormat('%I:%M'),
    formatHour = d3.timeFormat('%I %p'),
    formatDay = d3.timeFormat('%a %d'),
    formatWeek = d3.timeFormat('%b %d'),
    formatMonth = d3.timeFormat('%B'),
    formatYear = d3.timeFormat('%Y');
  
  return (d3.timeSecond(date) < date ? formatMillisecond
      : d3.timeMinute(date) < date ? formatSecond
      : d3.timeHour(date) < date ? formatMinute
      : d3.timeDay(date) < date ? formatHour
      : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
      : d3.timeYear(date) < date ? formatMonth
      : formatYear)(date);
}

// summary table SVG icons
const icons = ({
  ordinal: () => html`<div style="display:inline-block; border-radius:100%; width: 16px; height: 16px; background-color: ${colorMap.get("ordinal").color}; transform: scale(1.3); vertical-align: middle; align-items: center;margin-right:8px;}">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="2" height="2" fill="white"/>
    <rect x="7" y="4" width="6" height="2" fill="white"/>
    <rect x="4" y="7" width="2" height="2" fill="white"/>
    <rect x="7" y="7" width="6" height="2" fill="white"/>
    <rect x="4" y="10" width="2" height="2" fill="white"/>
    <rect x="7" y="10" width="6" height="2" fill="white"/>
  </svg>
</div>`,
  date: () => html`<div style="display:inline-block; border-radius:100%; width: 16px; height: 16px; background-color: ${colorMap.get("date").color}; transform: scale(1.3); vertical-align: middle; align-items: center;margin-right:8px;}">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="8" height="1" fill="white"/>
    <rect x="5" y="4" width="2" height="1" fill="white"/>
    <rect x="9" y="4" width="2" height="1" fill="white"/>
    <rect x="4" y="7" width="8" height="5" fill="white"/>
  </svg>
</div>`,
  continuous: () => html`<div style="display:inline-block; border-radius:100%; width: 16px; height: 16px; background-color: ${colorMap.get("continuous").color}; transform: scale(1.3); vertical-align: middle; align-items: center;margin-right:8px;}">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="4" height="2" transform="rotate(-90 4 12)" fill="white"/>
    <rect x="7" y="12" width="6" height="2" transform="rotate(-90 7 12)" fill="white"/>
    <rect x="10" y="12" width="8" height="2" transform="rotate(-90 10 12)" fill="white"/>
  </svg>
</div>`
});
