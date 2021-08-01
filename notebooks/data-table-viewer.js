/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */

// URL: https://observablehq.com/@randomfractals/data-table-viewer
// Title: Data Table Viewer
// Author: Taras Novak (@randomfractals)
// Version: 117
// Runtime version: 1

const m0 = {
  id: "d5a4b7a41937a0af@117",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Data Table Viewer

Use this Data Table 🈸 Viewer 📓 to view sample datasets or preview any public
[Apache Arrow](https://observablehq.com/@randomfractals/apache-arrow), 
**CSV**, [**GeoJSON**](https://www.rfc-editor.org/rfc/rfc7946.html) or **JSON array** data. Just paste your data url to fetch it. 

If you'd like to use similar tool in [VSCode Notebooks](https://marketplace.visualstudio.com/search?target=VSCode&category=Notebooks&sortBy=Installs) 📚 try [Data Table](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table) 🈸 notebook 📓 cell ⌗ output renderer extension.
`
)})
    },
    {
      name: "viewof dataSet",
      inputs: ["Inputs","dataSets","html"],
      value: (function(Inputs,dataSets,html){return(
Inputs.select(dataSets, {
  label: html`<b>dataset</b>`
})
)})
    },
    {
      name: "dataSet",
      inputs: ["Generators","viewof dataSet"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof dataUrl",
      inputs: ["Inputs","html","dataUrlParam","dataSet"],
      value: (function(Inputs,html,dataUrlParam,dataSet){return(
Inputs.text({
  label: html`<b>dataUrl</b>`,
  placeholder: 'type data url and click fetch', 
  value: `${dataUrlParam ? dataUrlParam : 'https://raw.githubusercontent.com/vega/vega-datasets/master/data/' + dataSet}`,
  submit: 'fetchData'
})
)})
    },
    {
      name: "dataUrl",
      inputs: ["Generators","viewof dataUrl"],
      value: (G, _) => G.input(_)
    },
    {
      name: "shareLink",
      inputs: ["md","dataUrl"],
      value: (function(md,dataUrl){return(
md `*share a link to your [data](https://observablehq.com/@randomfractals/data-table-viewer?dataUrl=${dataUrl})*`
)})
    },
    {
      name: "viewof dataSummaryView",
      inputs: ["SummaryTable","data"],
      value: (function(SummaryTable,data){return(
SummaryTable(data)
)})
    },
    {
      name: "dataSummaryView",
      inputs: ["Generators","viewof dataSummaryView"],
      value: (G, _) => G.input(_)
    },
    {
      name: "tableView",
      inputs: ["Inputs","data"],
      value: (function(Inputs,data){return(
Inputs.table(data)
)})
    },
    {
      name: "data",
      inputs: ["fetchData","dataUrl"],
      value: (function(fetchData,dataUrl){return(
fetchData(dataUrl)
)})
    },
    {
      name: "dataUrlParam",
      inputs: ["URLSearchParams","html"],
      value: (function(URLSearchParams,html){return(
new URLSearchParams(html`<a href>`.search).get('dataUrl')
)})
    },
    {
      name: "dataSets",
      value: (function(){return(
[
  'airports.csv', 'co2-concentration.csv', 'disasters.csv', 'flights-3m.csv', 'flights-airport.csv',
  'gapminder-health-income.csv', 'github.csv', 'iowa-electricity.csv', 'la-riots.csv', 'lookup_groups.csv',
  'lookup_people.csv', 'population_engineers_hurricanes.csv', 'seattle-temps.csv', 'seattle-weather.csv',
  'sf-temps.csv', 'sp500.csv', 'stocks.csv', 'us-employment.csv', 'weather.csv', 'windvectors.csv', 'zipcodes.csv',
  'barley.json', 'birdstrikes.json', 'budget.json', 'budgets.json', 'burtin.json', 'cars.json', 'climate.json',
  'countries.json', 'crimea.json', 'driving.json', 'flare-dependencies.json', 'flare.json', 
  'flights-2k.json', 'flights-5k.json', 'flights-10k.json', 'flights-20k.json', 
  'flights-200k.json', 'flights-200k.arrow',
  'gapminder.json', 'income.json', 'iris.json', 'jobs.json', 'londonCentroids.json',
  'monarchs.json', 'movies.json', 'normal-2d.json', 'points.json',
  'udistrict.json', 'unemployment-across-industries.json', 'us-state-capitals.json',
  'weball26.json', 'wheat.json'
]
)})
    },
    {
      name: "fetchData",
      inputs: ["d3Fetch","flattenGeoData","loadArrowData"],
      value: (function(d3Fetch,flattenGeoData,loadArrowData){return(
async function fetchData(dataUrl) {
  let data = [];
  console.log('fetchData:dataUrl:', dataUrl);
  if (dataUrl.endsWith('.csv')) {
    data = await d3Fetch.csv(dataUrl);
  } 
  else if (dataUrl.endsWith('.json') || dataUrl.endsWith('.geojson')) {
    data = await d3Fetch.json(dataUrl);
    if (data.features) {
      data = flattenGeoData(data);
    }
  }
  else if (dataUrl.endsWith('.arrow')) {
    data = loadArrowData(dataUrl);
  }
  return data;
}
)})
    },
    {
      name: "flattenGeoData",
      value: (function(){return(
function flattenGeoData(data) {
  if (data.features) {
    const features = data.features.map(feature => {
      let geometry = {};
      Object.keys(feature?.geometry).forEach(key => {
        geometry[`geometry.${key}`] = feature.geometry[key];
      });
      let properties = {};
      Object.keys(feature?.properties).forEach(key => {
        properties[`${key}`] = feature.properties[key];
      });
      const {geometry: g, properties: p, ...restOfKeys} = feature;
      return {...restOfKeys, ...properties, ...geometry};
    });
    return features;
  }
  return data;
}
)})
    },
    {
      name: "loadArrowData",
      inputs: ["arrow"],
      value: (function(arrow){return(
async function loadArrowData(dataUrl){
  const response = await fetch(dataUrl);
  const arrayBuffer = await response.arrayBuffer();
  const table = arrow.Table.from(new Uint8Array(arrayBuffer));
  const rows = Array(table.length);
  const fields = table.schema.fields.map(d => d.name);  
  for (let i=0, n=rows.length; i<n; ++i) {
    const proto = {};
    fields.forEach((fieldName, index) => {
      const column = table.getColumnAt(index);
      proto[fieldName] = column.get(i);
    });
    rows[i] = proto;
  }
  return rows;
}
)})
    },
    {
      name: "tableStyles",
      inputs: ["html"],
      value: (function(html){return(
html `
<style>
/* add space for sort direction symbol */
thead th span {
  margin-left: 0 !important;
  padding-right: 0.4rem;
}
</style>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Imports`
)})
    },
    {
      from: "@observablehq/summary-table",
      name: "SummaryTable",
      remote: "SummaryTable"
    },
    {
      name: "d3Fetch",
      inputs: ["require"],
      value: (function(require){return(
require('d3-fetch@3.0.1')
)})
    },
    {
      name: "arrow",
      inputs: ["require"],
      value: (function(require){return(
require('apache-arrow@0.4.1')
)})
    }
  ]
};

const m1 = {
  id: "@observablehq/summary-table",
  variables: [
    {
      name: "SummaryTable",
      inputs: ["SummaryCard","htl","width","SummarizeColumn"],
      value: (function(SummaryCard,htl,width,SummarizeColumn){return(
(data, {label="Summary"} = {}) => {
  const sample = data[0] || {};
  const cols = data.columns || Object.keys(sample);
  let value = []

  // Create the summary card and track data shape
  const summaryCard = SummaryCard(data, label)
  value.n_rows = summaryCard.value.n_rows
  value.n_columns = summaryCard.value.n_columns
  value.columns = cols

  // Compose the element
  const element = htl.html`<div style="display:inline-block; vertical-align:top;">${summaryCard}</div>
      <div style="display:inline-block;">
        <table style="vertical-align:middle; display:block; overflow-x:auto; max-width:${width}px;">
          <thead style="z-index:-999;">
          <th>Column</th>
          <th style="min-width:250px">Snapshot</th>
          <th>Missing</th>
          <th>Mean</th>
          <th>Median</th>
          <th>SD</th>
        </thead>
      ${cols.map(d => {
        const ele = SummarizeColumn(data, d)       
        value.push(ele.value) // get the value from the element
        return ele
      })}
    </table>
  </div>`  
  element.value = value;
  return element
}
)})
    },
    {
      name: "SummaryCard",
      inputs: ["getType","addTooltips","Plot","colorMap","htl","d3"],
      value: (function(getType,addTooltips,Plot,colorMap,htl,d3){return(
(data, label = "Summary") => {  
  // Compute values
  const sample = data[0] || {};
  const cols = data.columns || Object.keys(sample);
  const col_data = cols.map(d => {
    return {
      label:d === "" ? "unlabeled" : d, 
      type:getType(data, d)
    }
  })
  const n_columns = col_data.length;
  const n_rows = data.length;
  
  // Create the header row as a plot
  const header_plot = addTooltips(
    Plot.cellX(col_data, 
      {fill:d => colorMap.get(d.type).color, title: d => `${d.label}\n(${d.type})`}
    ).plot({
       x:{axis:null}, 
       width:100, 
       height:10, 
       color:{
         domain:[...colorMap.values()].map(d => d.color)
       }, 
       style:{
         overflow:"visible"
       }
    }), 
    {stroke:"black", "stroke-width":"3px"}
  )
  
  // Create the columns as a plot
  const col_plot = Plot.cellX(col_data, {fill:d => colorMap.get(d.type).color, fillOpacity:.3}).plot({
    x:{axis:null}, 
    width:100, height:80, 
    color:{
       domain:[...colorMap.values()].map(d => d.color)
    }}
  )
  
  // Construct the element
  const arrow_styles = {display: "inline-block",
                        verticalAlign: "top",
                        transformOrigin: "0 0",
                        transform: "rotate(90deg)",
                        marginTop: "20px",
                        position:"absolute",
                        left: "114px",
                        top: "54px"}
  
  const ele = htl.html`<div style="font-family:sans-serif; font-size:13px; margin-right:10px;">
      <span style="font-size:1.3em">${label}</span>
      <div>${d3.format(",.0f")(n_columns)} ⟶</div>
      ${header_plot}
      <span style="display:inline-block">${col_plot}</span>
      <span style="display:inline-block; vertical-align:top;">${d3.format(",.0f")(n_rows)}<br/></span>
      <span style=${arrow_styles}>⟶</span>
    </div>`   
  
  ele.value = {n_rows, n_columns};
  return ele 
}
)})
    },
    {
      name: "SummarizeColumn",
      inputs: ["getType","htl","icon_fns","d3","SmallStack","pct_format","Histogram","html"],
      value: (function(getType,htl,icon_fns,d3,SmallStack,pct_format,Histogram,html){return(
(data, col) => {
  
  let content, value, format, el, chart, missing_label, pct_missing, min, max, median, mean, sd;
  
  // Construct content based on type  
  const type = getType(data, col)
  
  const col1 = htl.html`<td style="white-space: nowrap;vertical-align:middle;padding-right:5px;padding-left:3px;">${icon_fns[type]()}<strong style="vertical-align:middle;">${col === "" ? "unlabeled" : col}</strong></td>`
  
  switch(type) {
      // Categorical columns
    case 'ordinal': 
      format = d3.format(",.0f") 
      
      // Calculate category percent and count
      const categories = d3.rollups(
          data, 
          v => ({count:v.length, pct:v.length / data.length || 1}), 
          d => d[col]
        ).sort((a, b) => b[1].count - a[1].count)
        .map(d => {
          let obj = {}
          obj[col] = (d[0] === null || d[0] === "") ? "(missing)" : d[0]
          obj.count = d[1].count
          obj.pct = d[1].pct
          return obj
      })
      
      // Calculate pct. missing        
      pct_missing = data.filter(d => d[col] === null).length / data.length
      
      // Create the chart
      const stack_chart = SmallStack(categories, col)          
      
      // element to return
      el = htl.html`<tr style="font-family:sans-serif;font-size:13px;">
        ${col1}          
        <td><div style="position:relative;">${stack_chart}</div></td>
        <td>${pct_format(pct_missing)}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>`;
      
      value = {column: col, type, min:null, max: null, mean: null, median: null,
               sd: null, missing:pct_missing, n_categories:categories.length}
      break;
      
      // Date columns
    case "date": 
      // Calculate and format start / end      
      const start = d3.min(data, d => +d[col])
      const end = d3.max(data, d => +d[col])               
      mean = d3.mean(data, d => +d[col]);
      median = d3.median(data, d => +d[col]);
      sd = d3.deviation(data, d => +d[col]);
      
      // Calculate pct. missing         
      pct_missing = data.filter(d => d[col] === null).length / data.length      
      chart = Histogram(data, col, type)
      
      // Element to return
      el = htl.html`<tr style="font-family:sans-serif;font-size:13px;">
          ${col1}
          <td><div style="position:relative;">${chart}</div></td>
          <td>${pct_format(pct_missing)}</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>` 
      value = {column: col, type, min:start, max: end, mean: null, median: null, 
               sd: null, missing:pct_missing, n_categories:null}
      break;
      
      // Continuous columns
    default: 
      // Compute values 
      format = d3.format(",.0f")
      min = d3.min(data, d => +d[col])
      max = d3.max(data, d => +d[col])
      mean = d3.mean(data, d => +d[col])
      median = d3.median(data, d => +d[col])
      sd = d3.deviation(data, d => +d[col])
      pct_missing = data.filter(d => d[col] === null || isNaN(d[col])).length / data.length
      
      chart = Histogram(data, col, type)
      // Element to return
      el = htl.html`<tr style="font-family:sans-serif;font-size:13px;">
          ${col1}
          <td><div style="position:relative;top:3px;">${chart}</div></td>
          <td>${pct_format(pct_missing)}</td>
          <td>${format(mean)}</td>
          <td>${format(median)}</td>
          <td>${format(sd)}</td>
        </tr>` 
      
      value = {column: col, type, min, max, mean, median, sd, missing:pct_missing, n_categories:null}
      break;
  }  
  el.value = value;
  el.appendChild(html`<style>td {vertical-align:middle;} </style>`)
  return el
}
)})
    },
    {
      name: "getType",
      value: (function(){return(
(data, column) => {
  for (const d of data) {
    const value = d[column];
    if (value === null) continue;
    if (typeof value === "number") return "continuous";
    if (value instanceof Date) return "date";
    return "ordinal"
  }
  // if all are null, return ordinal
  return "ordinal"
}
)})
    },
    {
      from: "@mkfreeman/plot-tooltip",
      name: "addTooltips",
      remote: "addTooltips"
    },
    {
      name: "colorMap",
      inputs: ["d3","_"],
      value: (function(d3,_){return(
new Map([["ordinal","rgba(78, 121, 167, 1)"],
 ["continuous", "rgba(242, 142, 44, 1)"],
 ["date", "rgba(225,87,89, 1)"]
].map(d => {
  const col = d3.color(d[1])
  const color_copy = _.clone(col)
  color_copy.opacity = .6
  return [d[0], {color:col.formatRgb(), brighter:color_copy.formatRgb()}]
}))
)})
    },
    {
      name: "icon_fns",
      inputs: ["html","colorMap"],
      value: (function(html,colorMap){return(
{
  ordinal:() => html`<div style="display:inline-block; border-radius:100%; width: 16px; height: 16px; background-color: ${colorMap.get("ordinal").color}; transform: scale(1.3); vertical-align: middle; align-items: center;margin-right:8px;}">
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
  continuous:() => html`<div style="display:inline-block; border-radius:100%; width: 16px; height: 16px; background-color: ${colorMap.get("continuous").color}; transform: scale(1.3); vertical-align: middle; align-items: center;margin-right:8px;}">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="4" height="2" transform="rotate(-90 4 12)" fill="white"/>
    <rect x="7" y="12" width="6" height="2" transform="rotate(-90 7 12)" fill="white"/>
    <rect x="10" y="12" width="8" height="2" transform="rotate(-90 10 12)" fill="white"/>
  </svg>
</div>`
}
)})
    },
    {
      name: "SmallStack",
      inputs: ["addTooltips","Plot","pct_format","d3"],
      value: (function(addTooltips,Plot,pct_format,d3){return(
(categoryData, col) => {
  // Get a horizontal stacked bar
  const label = categoryData.length === 1 ? " category" : " categories"
  return addTooltips(
    Plot.barX(categoryData, {x:"count", fill:col, y:0, title: d => d[col] + "\n" + pct_format(d.pct)}).plot({
      color:{scheme:"blues"}, 
      marks:[
        Plot.text([0,0], {x:0, dy:13, text:d => d3.format(",.0f")(categoryData.length) + `${label}`})
      ], 
      style:{
        paddingTop:"0px",
        paddingBottom:"15px", 
        textAnchor:"start", 
        overflow:"visible"    
      }, 
      x:{axis:null},
      color:{
        domain:categoryData.map(d => d[col]), 
        scheme:"blues", 
        reverse: true
      },
      height:30, 
      width:205,
      y:{
        axis:null, 
        range:[30, 3]
      }, 
      }
    ), {fill:"darkblue"})
}
)})
    },
    {
      name: "pct_format",
      inputs: ["d3"],
      value: (function(d3){return(
d3.format(".1%")
)})
    },
    {
      name: "Histogram",
      inputs: ["colorMap","d3","getDateFormat","addTooltips","Plot"],
      value: (function(colorMap,d3,getDateFormat,addTooltips,Plot){return(
(data, col, type = "continuous") => {
  // Compute color + mean
  const barColor = colorMap.get(type).brighter
  const mean = d3.mean(data, d => d[col])
  
  // Formatter for the mean
  const extent = d3.extent(data, d => d[col])
  const format = type === "date" ? getDateFormat(extent):d3.format(",.0f") 
  const rules = [{label:"mean", value:mean}] 
  return addTooltips(
    Plot.plot({
      height:55, 
      width:240, 
      style:{
        display:"inline-block"
      },
      x:{
        label:"",
        ticks: extent,
        tickFormat:format
      }, 
      y:{
        axis:null
      },     
      marks:[
        Plot.rectY(data, Plot.binX({y:"count", title: (elems) => {
          // compute range for the elements
          const barExtent = d3.extent(elems, d => d[col]);
          const barFormat = type === "date" ? getDateFormat(barExtent):d3.format(",.0f") 
          return `${elems.length} rows\n[${barFormat(barExtent[0])} to ${barFormat(barExtent[1])}]`}
          }, {x:col, fill: barColor})
        ), 
        Plot.ruleY([0]), 
        Plot.ruleX(rules, {x:"value", strokeWidth:2, title:d => `${d.label} ${col}: ${format(d.value)}` })
      ], 
      style:{
        marginLeft:-17,
        background:"none",      
        overflow: "visible" 
      }
    }), {opacity:1, fill:colorMap.get(type).color})
}
)})
    },
    {
      name: "getDateFormat",
      inputs: ["d3"],
      value: (function(d3){return(
(extent) => {
  const formatMillisecond = d3.utcFormat(".%L"),
      formatSecond = d3.utcFormat(":%S"),
      formatMinute = d3.utcFormat("%I:%M"),
      formatHour = d3.utcFormat("%I %p"),
      formatDay = d3.utcFormat("%a %d"),
      formatWeek = d3.utcFormat("%b %d"),
      formatMonth = d3.utcFormat("%B"),
      formatYear = d3.utcFormat("%Y");

  // Test on the difference between the extent, offset by 1
  
  return extent[1] > d3.utcYear.offset(extent[0], 1)? formatYear :
    extent[1] > d3.utcMonth.offset(extent[0], 1)? formatMonth :
    extent[1] > d3.utcWeek.offset(extent[0], 1) ? formatWeek :
    extent[1] > d3.utcDay.offset(extent[0], 1) ? formatDay :
    extent[1] > d3.utcHour.offset(extent[0], 1) ? formatHour :
    extent[1] > d3.utcMinute.offset(extent[0], 1) ? formatMinute :
    extent[1] > d3.utcSecond.offset(extent[0], 1) ? formatSecond :
    extent[1] > d3.utcMillisecond.offset(extent[0], 1) ? formatMillisecond :
    formatDay
}
)})
    }
  ]
};

const m2 = {
  id: "@mkfreeman/plot-tooltip",
  variables: [
    {
      name: "addTooltips",
      inputs: ["d3","id_generator","hover","html"],
      value: (function(d3,id_generator,hover,html){return(
(chart, hover_styles = { fill: "blue", opacity: 0.5 }) => {
  // Add the hover g

  // Workaround if it's in a figure
  const type = d3.select(chart).node().tagName;
  const wrapper =
    type === "FIGURE" ? d3.select(chart).select("svg") : d3.select(chart);

  wrapper.style("overflow", "visible"); // to avoid clipping at the edges

  wrapper.selectAll("path").style("pointer-events", "visibleStroke"); // only trigger hover for lines in visible area

  const tip = wrapper
    .selectAll(".hover-tip")
    .data([""])
    .join("g")
    .attr("class", "hover")
    .style("pointer-events", "none")
    .style("text-anchor", "middle");

  // Add a unique id to the chart for styling
  const id = id_generator();

  // Add the event listeners
  d3.select(chart)
    .classed(id, true) // using a class selector so that it doesn't overwrite the ID
    .selectAll("title")
    .each(function () {
      // Get the text out of the title, set it as an attribute on the parent, and remove it
      const title = d3.select(this); // title element that we want to remove
      const parent = d3.select(this.parentNode); // visual mark on the screen
      const t = title.text();
      if (t) {
        parent.attr("__title", t).classed("has-title", true);
        title.remove();
      }
      // Mouse events
      parent
        .on("mousemove", function (event) {
          const text = d3.select(this).attr("__title");
          const pointer = d3.pointer(event, wrapper.node());
          if (text) tip.call(hover, pointer, text.split("\n"));
          else tip.selectAll("*").remove();

          // Keep within the parent horizontally
          const tipSize = tip.node().getBBox();
          if (pointer[0] + tipSize.x < 0)
            tip.attr(
              "transform",
              `translate(${tipSize.width / 2}, ${pointer[1] + 7})`
            );
          else if (pointer[0] + tipSize.width / 2 > wrapper.attr("width"))
            tip.attr(
              "transform",
              `translate(${wrapper.attr("width") - tipSize.width / 2}, ${
                pointer[1] + 7
              })`
            );
        })
        .on("mouseout", (event) => {
          tip.selectAll("*").remove();
        });
    });

  // Remove the tip if you tap on the wrapper (for mobile)
  wrapper.on("touchstart", () => tip.selectAll("*").remove());
  // Add styles
  const style_string = Object.keys(hover_styles)
    .map((d) => {
      return `${d}:${hover_styles[d]};`;
    })
    .join("");

  // Define the styles
  const style = html`<style>
      .${id} .has-title {
       cursor: pointer; 
       pointer-events: all;
      }
      .${id} .has-title:hover {
        ${style_string}
    }
    </style>`;
  chart.appendChild(style);
  return chart;
}
)})
    },
    {
      name: "id_generator",
      value: (function(){return(
() => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return "a" + S4() + S4();
}
)})
    },
    {
      name: "hover",
      value: (function(){return(
(tip, pos, text) => {
  const side_padding = 10;
  const vertical_padding = 5;
  const vertical_offset = 15;

  // Empty it out
  tip.selectAll("*").remove();

  // Append the text
  tip
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("transform", `translate(${pos[0]}, ${pos[1] + 7})`)
    .selectAll("text")
    .data(text)
    .join("text")
    .style("dominant-baseline", "ideographic")
    .text((d) => d)
    .attr("y", (d, i) => (i - (text.length - 1)) * 15 - vertical_offset)
    .style("font-weight", (d, i) => (i === 0 ? "bold" : "normal"));

  const bbox = tip.node().getBBox();

  // Add a rectangle (as background)
  tip
    .append("rect")
    .attr("y", bbox.y - vertical_padding)
    .attr("x", bbox.x - side_padding)
    .attr("width", bbox.width + side_padding * 2)
    .attr("height", bbox.height + vertical_padding * 2)
    .style("fill", "white")
    .style("stroke", "#d3d3d3")
    .lower();
}
)})
    }
  ]
};

const notebook = {
  id: "d5a4b7a41937a0af@117",
  modules: [m0,m1,m2]
};

export default notebook;
