# vscode-data-table

[![Apache-2.0 License](https://img.shields.io/badge/license-Apache2-brightgreen.svg)](http://opensource.org/licenses/Apache-2.0)
[![Version](https://vsmarketplacebadge.apphb.com/version-short/RandomFractalsInc.vscode-data-table.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/RandomFractalsInc.vscode-data-table.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads/RandomFractalsInc.vscode-data-table.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)
<a href='https://ko-fi.com/dataPixy' target='_blank' title='support: https://ko-fi.com/dataPixy'>
  <img height='24' style='border:0px;height:20px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' alt='https://ko-fi.com/dataPixy' /></a>

<h1 align="center">
  <img width="128" height="128" src="resources/images/data-table.png" />
  <br />
  Data Table for Notebook 📓 cell ⌗ data outputs
</h1>

See [Data Preview](https://github.com/RandomFractals/vscode-data-preview) 🈸 vscode extension for a generic [Grid Data Viewer](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview) with many common data formats support, search, sort, filters, grouping, splits, pivot tables, aggregates and basic charts 📊

## Data Table 🈸 Renderer View

Data Table 🈸 Notebook 📓 cell ⌗ output renderer uses [Observable Inputs Table](https://github.com/observablehq/inputs#Table) component for fast incremental data display and scrolling of datasets loaded in [VSCode Notebooks](https://code.visualstudio.com/api/extension-guides/notebook) 📚.

![Data Table 🈸 Renderer View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-renderer.png?raw=true 
 "Data Table 🈸 Renderer View")

## 🈸 Features

- View `CSV`, semi-flat `XML`, [`GeoJSON`](https://www.rfc-editor.org/rfc/rfc7946.html) and `JSON` **array** data Notebook 📓 cell ⌗ output in HTML table with column sort, number and date formatting
- Incremental rows creation on table scroll for faster display of larger datasets
- Notebook cell text output display in a scrollable container with [`pre-wrap`](https://www.w3docs.com/snippets/css/how-to-wrap-text-in-a-pre-tag-with-css.html)
- [Data Summary 📊 Renderer View](https://github.com/RandomFractals/vscode-data-table#data-summary--renderer-view) for a quick overview of loaded dataset
- [REST Book](https://github.com/RandomFractals/vscode-data-table#rest-book-example) 📓 [TypeScript Notebooks](https://github.com/RandomFractals/vscode-data-table#typescript-notebook-example) 📚 [.NET Interactive Notebooks](https://github.com/RandomFractals/vscode-data-table#net-interactive-notebook-example) 📚 and [Pyolite](https://github.com/RandomFractals/vscode-data-table#pyolite-notebook-example) 🐍 examples
- [Geo 🌐 Data Table 🈸 View](https://github.com/RandomFractals/vscode-data-table#geo--data-table--view)
- Experimental [XML Data Table 🈸 View](https://github.com/RandomFractals/vscode-data-table#xml-data-table--view)

## Observable Data Table 🈸 Viewer 📓

You can also use our generic [Data Table Viewer](https://observablehq.com/@randomfractals/data-table-viewer) 📓 notebook to preview public datasets in a browser:

![Observable Data Table 🈸 Viewer 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/observable-data-table-viewer.png?raw=true 
 "Observable Data Table 🈸 Viewer 📓")

Or use it in vscode with [Observable JS Notebook 📓 Inspector](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.js-notebook-inspector) 🕵️:

![Observable JS Data Table 🈸 Viewer 📓 Inspector 🕵️](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-viewer-notebook.png?raw=true 
 "Observable JS Data Table 🈸 Viewer 📓 Inspector 🕵️")

Or load Data Table 🈸 Viewer 📓 with [Observable JS](https://marketplace.visualstudio.com/items?itemName=GordonSmith.observable-js) vscode extension:

![Observable JS Data Table 🈸 Viewer 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-viewer-ojs.png?raw=true 
 "Observable JS Data Table 🈸 Viewer 📓")

## Data Summary 📊 Renderer View

This general purpose Data Table 🈸 Viewer extension also includes Data Summary 📊 Renderer based on modifield [Observable Summary Table](https://observablehq.com/@observablehq/summary-table) component for a quick overview of datasets loaded in [VSCode Notebooks](https://code.visualstudio.com/api/extension-guides/notebook) 📚.

![Data Summary 📊 Renderer View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-summary-renderer.png?raw=true 
 "Data Summary 📊 Renderer View")

## 🈸 Examples

Data Table 🈸 for Notebooks 📚 extension v1.6.0 and up ships with built-in Notebook examples. You can access provided Notebook Examples listed below via `Data Table: Notebook Examples` command from `View -> Command Palette...`

![Data Table 🈸 Notebook Examples](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-notebook-examples.png?raw=true 
 "Data Summary Data Table 🈸 Notebook Examples")

### REST Book Example

1. Install [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) 📓 vscode extension

2. Load [Chicago Traffic Tracker](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/chicago-traffic-tracker.restbook) REST Book 📓

3. Run All cells ⌗

4. Click on `...` in the gutter of `GET` data output and change it to Data Table 🈸 renderer:

![Chicago Traffic Data REST Book 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-chicago-traffic.png?raw=true 
 "Chicago Traffic Data REST Book 📓")

## TypeScript Notebook Example

1. Install [TypeScript Notebooks](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) 📚 vscode extension

2. Download [USA Airports data files](https://github.com/RandomFractals/vscode-data-table/tree/main/data)

3. Load [USA Airports](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/usa-airports.ipynb) TypeScript Notebook 📓

4. Run All cells ⌗ to view local `CSV` and `JSON` data outputs with Data Table 🈸:

![USA Airports Data TypeScript Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-usa-airports.png?raw=true 
 "USA Airports Data TypeScript Notebook 📓")

## .NET Interactive Notebook Example

1. Install [.NET Install Tool for Extension Authors](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-runtime) vscode extension

2. Install [.NET Interactive Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) 📚 vscode extension

3. Load [Chicago Speed Cameras](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/chicago-speed-cameras.ipynb) .NET Interactive Notebook 📓

4. Run All cells ⌗:

![Chicago Speed Cameras .NET Interactive Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-net-interactive.png?raw=true 
 "Chicago Speed Cameras .NET Interactive Notebook 📓")

## Pyolite Notebook Example

1. Install [Pyolite](https://marketplace.visualstudio.com/items?itemName=joyceerhl.vscode-pyolite) 🐍 vscode extension

2. Load [Chicago Red Light Cameras](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/chicago-red-light-cameras.ipynb) Pyolite Notebook 📓

3. Run All cells ⌗:

![Chicago Red Light Cameras Pyolite Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-pyolite-notebook.png?raw=true 
 "Chicago Red Light Cameras Pyolite Notebook 📓")

## Geo 🌐 Data Table 🈸 View

1. Install [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) 📓 vscode extension

2. Load [World 🌐 Rivers](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/world-rivers.restbook) REST Book 📓

3. Run All cells ⌗

4. Click on `...` in the gutter of `GET` data output and change it to Data Table 🈸 for geo table view:

![World 🌐 Rivers Geo Data REST Book 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-geo-view.png?raw=true 
 "World 🌐 Rivers Geo Data REST Book 📓")

## XML Data Table 🈸 View

1. Load [World 🌐 GDP](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/world-gdp.restbook) REST Book 📓

2. Run All cells ⌗

3. Click on `...` in the gutter of `GET` data output and change it to Data Table 🈸 for XML data table view:

![World 🌐 GDP Data REST Book 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-world-gdp.png?raw=true 
 "World 🌐 GDP Data REST Book 📓")

# Recommended Extensions

Other recommended extensions for working with Interactive Notebooks 📚 data 🈸 charts 📈 and geo 🗺️ data formats in [VSCode](https://code.visualstudio.com/):

| Extension | Description |
| --- | --- |
| [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) | Notebook extension for running REST queries |
| [TypeScript Notebooks](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) | TypeScript with [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) Notebooks 📚 |
| [.NET Interactive Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) | .NET Interactive [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) Notebooks 📚 |
| [Pyolite](https://marketplace.visualstudio.com/items?itemName=joyceerhl.vscode-pyolite) 🐍 | [Pyodide](https://pyodide.org) 🐍 kernel for [JupyterLite](https://github.com/jtpio/jupyterlite) Notebooks 📚 |
| [Observable JS](https://marketplace.visualstudio.com/items?itemName=GordonSmith.observable-js) | Observable JS compiler with [Observable](https://observablehq.com/@observablehq/observable-for-jupyter-users?collection=@observablehq/observable-for-jupyter-users) `js` and `md` code outline and previews. |
| [JS Notebook 📓 Inspector 🕵️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.js-notebook-inspector) | Provides Interactive Preview of [Observable JS Notebooks](https://observablehq.com/documentation#notebook-fundamentals) 📚, Notebook 📓 nodes ⎇ & cells ⌗ source code |
| [Data Preivew 🈸](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview) | Data Preview 🈸 extension for importing 📤 viewing 🔎 slicing 🔪 dicing 🎲 charting 📊 & exporting 📥 large JSON array/config, YAML, Apache Arrow, Avro & Excel data files |
| [Geo Data Viewer 🗺️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.geo-data-viewer) | [kepler.gl](https://kepler.gl) Geo Data Analytics tool to gen. some snazzy 🗺️s  w/0 `Py` 🐍 `pyWidgets` ⚙️ `pandas` 🐼 or `react` ⚛️ |
| [Vega Viewer 📈](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-vega-viewer) | Provides Interactive Preview of Vega & Vega-Lite maps 🗺️ & graphs 📈 |

# Dev Log

See [#DataTableView 🈸 tag on Twitter](https://twitter.com/hashtag/dataTableView?src=hash&f=live&vertical=default) for the latest and greatest updates on this vscode extension and what's in store next.

# Dev Build

```bash
$ git clone https://github.com/RandomFractals/vscode-data-table
$ cd vscode-data-table
$ npm install
$ npm run compile
$ code .
```
`F5` to launch Data Table extension VSCode debug session.

||

```bash
vscode-data-table>vsce package
```
to generate `VSIX` Data Table extension package with [vsce](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce) from our latest for local dev install in VSCode.

# Contributions

Any and all test, code or feedback contributions are welcome. 

Open an [issue](https://github.com/RandomFractals/vscode-data-table/issues) or create a pull request to make this Data Table 🈸 extension work better for all.

# Backers

<a href='https://ko-fi.com/dataPixy' target='_blank'>
  <img height='36' style='border:0px;height:36px;' border='0'
    src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' 
    alt='support me on ko-fi.com' />
</a>
