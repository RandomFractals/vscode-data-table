# vscode-data-table

[![Apache-2.0 License](https://img.shields.io/badge/license-Apache2-brightgreen.svg)](http://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/visual-studio-marketplace/v/RandomFractalsInc.vscode-data-table.svg?color=orange&style=?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/RandomFractalsInc.vscode-data-table.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/RandomFractalsInc.vscode-data-table.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)
<a href='https://ko-fi.com/dataPixy' target='_blank' title='support: https://ko-fi.com/dataPixy'>
  <img height='24' style='border:0px;height:20px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' alt='https://ko-fi.com/dataPixy' /></a>

<h1 align="center">
  <img width="128" height="128" src="resources/images/data-table.png" />
  <br />
  Data Table Renderers for <a href='https://code.visualstudio.com/blogs/2021/11/08/custom-notebooks' target='_blank' title='VSCode Notebooks Intro'>VSCode Notebooks</a> 📚
</h1>

See [Data Preview](https://github.com/RandomFractals/vscode-data-preview) 🈸 vscode extension for a generic [Grid Data Viewer](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview) with many common data formats support, search, sort, filters, grouping, splits, pivot tables, aggregates and basic charts 📊.

# Support

These [Data Table Renderers](https://github.com/RandomFractals/vscode-data-table) were created to enhance raw data views in Jupyter and custom [VSCode Notebooks](https://code.visualstudio.com/blogs/2021/11/08/custom-notebooks) 📚.

Please consider becoming a [Fan](https://github.com/sponsors/RandomFractals/sponsorships?tier_id=18883&preview=false) and sponsoring our dev efforts on this and other [Random Fractals, Inc.](https://twitter.com/search?q=%23RandomFractalsInc&src=typed_query&f=live) code and [data viz extensions](https://marketplace.visualstudio.com/publishers/RandomFractalsInc) if you find them useful, educational, or enhancing your daily dataViz/dev code workflows and exploratory data analysis:

☕️ https://ko-fi.com/dataPixy
💖 https://github.com/sponsors/RandomFractals

# Data Table 🈸 Renderers

Data Table Renderers is a collection of custom tabular data renderers for vscode notebooks.

![Data Table 🈸 Renderers](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-renderers.png?raw=true
 "Data Table 🈸 Renderers")

# 🈸 Features

- View `CSV`, semi-flat `XML`, [`GeoJSON`](https://www.rfc-editor.org/rfc/rfc7946.html) and `JSON` **array** data Notebook 📓 cell ⌗ output in HTML table with column sort, number and date formatting
- Incremental Data Table 🈸 rows creation on table scroll for faster display of larger datasets
- [Data Summary 📊 Renderer View](https://github.com/RandomFractals/vscode-data-table#data-summary--renderer-view) for a quick overview of loaded dataset
- [Flat Data 中 Grid Renderer](https://github.com/RandomFractals/vscode-data-table#flat-data-%E4%B8%AD-grid-renderer) with column summary headers, filtering, and `CSV` save options
- Built-in [REST Book](https://github.com/RandomFractals/vscode-data-table#rest-book-example) 📓, [Python](https://github.com/RandomFractals/vscode-data-table#python-notebook-example) 🐍, [TypeScript Notebook](https://github.com/RandomFractals/vscode-data-table#typescript-notebook-example) 📓, [.NET Interactive Notebook](https://github.com/RandomFractals/vscode-data-table#net-interactive-notebook-example) 📓, and [Pyolite/Pyodide](https://github.com/RandomFractals/vscode-data-table#pyolite-notebook-example) 🐍 [Notebook Examples](https://github.com/RandomFractals/vscode-data-table#-examples) 📚
- [Geo 🌐 Data Table 🈸 View](https://github.com/RandomFractals/vscode-data-table#geo--data-table--view)
- Experimental [XML Data Table 🈸 View](https://github.com/RandomFractals/vscode-data-table#xml-data-table--view)
- Notebook 📓 cell ⌗ [Text Output](https://github.com/RandomFractals/vscode-data-table#text-oputput-view) scrollable container with [code pre-wrap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) for quick copy/paste to other places
- Use [Data Table](https://github.com/RandomFractals/vscode-data-table#data-table--renderer-view), [Flat Data Grid](https://github.com/RandomFractals/vscode-data-table#flat-data-%E4%B8%AD-grid-renderer) & [Data Summary](https://github.com/RandomFractals/vscode-data-table#data-summary--renderer-view) Notebook 📓 cell renderers with [Pyolite/Pyodide](https://marketplace.visualstudio.com/items?itemName=joyceerhl.vscode-pyodide) 🐍 kernel in [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) Notebooks [VSCode web editor](https://code.visualstudio.com/docs/editor/vscode-web) on [vscode.dev](https://vscode.dev) and [github.dev](https://github.dev/github/dev):

![Flat Data Grid 中 in browser](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/flat-data-grid-in-browser.png?raw=true
 "Flat Data Grid 中 in browser")

## Data Table 🈸 Renderer View

Data Table 🈸 Notebook 📓 cell ⌗ output renderer uses [Observable Inputs Table](https://github.com/observablehq/inputs#Table) component for fast incremental data display and scrolling of datasets loaded in [VSCode Notebooks](https://code.visualstudio.com/api/extension-guides/notebook) 📚

![Data Table 🈸 Renderer View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-renderer.png?raw=true
 "Data Table 🈸 Renderer View")

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

This general purpose Data Table 🈸 Renderer extension also includes Data Summary 📊 Renderer based on modifield [Observable Summary Table](https://observablehq.com/@observablehq/summary-table) component for a quick overview of datasets loaded in [VSCode Notebooks](https://code.visualstudio.com/api/extension-guides/notebook) 📚

![Data Summary 📊 Renderer View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-summary-renderer.png?raw=true
 "Data Summary 📊 Renderer View")

## Flat Data 中 Grid Renderer

[Flat Data Grid](https://github.com/RandomFractals/vscode-data-table/issues/115) renderer is the latest addition to this custom tabular data renderers collection vscode extension. It's based on the [Flat UI](https://github.com/githubocto/flat-ui) React data grid component library created by the [GitHub Next](https://twitter.com/GitHubNext) dev team & used in [Flat Data](https://next.github.com/projects/flat-data/) viewer on [flatgithub.com](https://flatgithub.com).

![Flat Data 中 Grid Renderer Example](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/flat-data-grid-renderer.png?raw=true
 "Flat Data 中 Grid Renderer Example")

## 🈸 Examples

Data Table 🈸 for Notebooks 📚 extension v1.6.0 and up ships with built-in Notebook examples. You can access provided Notebook Examples listed below via `Data Table: Notebook Examples` command from `View -> Command Palette...` vscode menu:

![Data Table 🈸 Notebook Examples](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-notebook-examples.png?raw=true
 "Data Summary Data Table 🈸 Notebook Examples")

## Runme Notebook Example

1. Install [Runme](https://marketplace.visualstudio.com/items?itemName=stateful.runme) vscode extension

2. Load [notebooks/world-lakes.md](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/world-lakes.md) document

3. Click on ▶️ in the markdown text editor context menu to `Open markdown as Runme` 📓.

4. Run All ᐅ cells ⌗

5. Click on `...` in the gutter of the `curl` command cell and `Change Presentation` to one of the Data Table 🈸 renderers or [Leaflet 🍃 Map 🗺️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-leaflet) renderer:

![World Lakes Runme Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/world-lakes-runbook.gif?raw=true
 "World Lakes Runme Notebook 📓")

## REST Book Example

1. Install [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) 📓 vscode extension

2. Load [Chicago Traffic Tracker](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/chicago-traffic-tracker.restbook) REST Book 📓

3. Run All ᐅ cells ⌗

4. Click on `...` in the gutter of `GET` data output and change it to Data Table 🈸 renderer:

![Chicago Traffic Data REST Book 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-chicago-traffic.png?raw=true
 "Chicago Traffic Data REST Book 📓")

## Python Notebook Example

1. Install [`vega_datasets`](https://github.com/altair-viz/vega_datasets) and [`altair`](https://github.com/altair-viz/altair) Python libraries via [`pip`](https://pypi.org/project/pip/) or [`conda`](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html):

```
$ pip install altair vega_datasets
```
or

```
$ conda install -c conda-forge altair vega_datasets
```

2. Load [Iris Vega Data](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/iris-vega-data.ipynb) Python 🐍 Notebook 📓

3. Run All ᐅ cells ⌗

4. Click on `...` in the gutter of iris data output and change it to Data Table 🈸 renderer:

![Iris Vega Data Table 🈸 View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/iris-data-table.png?raw=true
 "Iris Vega Data Table 🈸 View")

or switch it to Data Summary 🈷️ renderer:

![Iris Vega Data Table 🈷️ View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/iris-data-summary.png?raw=true
 "Iris Vega Data Summary 🈷️ View")

## TypeScript Notebook Example

1. Install [TypeScript Notebooks](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) 📚 vscode extension

2. Download [USA Airports data files](https://github.com/RandomFractals/vscode-data-table/tree/main/data)

3. Load [USA Airports](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/usa-airports-ts.nnb) TypeScript Notebook 📓

4. Run All ᐅ cells ⌗ to view local `CSV` and `JSON` text data outputs with Data Table 🈸:

![USA Airports TypeScript Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/usa-airports-ts-notebook.png?raw=true
 "USA Airports TypeScript Notebook 📓")

Also, try new [USA State Capitals](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/usa-state-capitals-ts.nnb) TypesScript Notebook 📓 with `GeoJSON` [node-fetch](https://github.com/node-fetch/node-fetch) and [Flat Data Grid](https://github.com/RandomFractals/vscode-data-table#flat-data-%E4%B8%AD-grid-renderer) renderer from built-in [Notebook Examples](https://github.com/RandomFractals/vscode-data-table#-examples):

![USA State Capitals TypeScript Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/usa-state-capitals-ts-notebook.png?raw=true
 "USA State Captitals TypeScript Notebook 📓")

## .NET Interactive Notebook Example

1. Install [.NET Install Tool for Extension Authors](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-runtime) vscode extension

2. Install [.NET Interactive Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) 📚 vscode extension

3. Load [Chicago Speed Cameras](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/chicago-speed-cameras-net.ipynb) .NET Interactive Notebook 📓

4. Run All ᐅ cells ⌗:

![Chicago Speed Cameras .NET Interactive Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-net-interactive.png?raw=true
 "Chicago Speed Cameras .NET Interactive Notebook 📓")

## Pyolite Notebook Example

1. Install [Pyodide](https://marketplace.visualstudio.com/items?itemName=joyceerhl.vscode-pyodide) 🐍 vscode extension

2. Load [Chicago Red Light Cameras](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/chicago-red-light-cameras.ipynb) Pyolite Notebook 📓

3. Run All ᐅ cells ⌗:

![Chicago Red Light Cameras Pyolite Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-pyolite-notebook.png?raw=true
 "Chicago Red Light Cameras Pyolite Notebook 📓")

## Geo 🌐 Data Table 🈸 View

1. Install [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) 📓 vscode extension

2. Load [World 🌐 Rivers](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/world-rivers.restbook) REST Book 📓

3. Run All ᐅ cells ⌗

4. Click on `...` in the gutter of `GET` data output and change it to Data Table 🈸 for geo table view:

![World 🌐 Rivers Geo Data REST Book 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-geo-view.png?raw=true
 "World 🌐 Rivers Geo Data REST Book 📓")

## XML Data Table 🈸 View

1. Load [World 🌐 GDP](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/world-gdp.restbook) REST Book 📓

2. Run All ᐅ cells ⌗

3. Click on `...` in the gutter of `GET` data output and change it to Data Table 🈸 for XML data table view:

![World 🌐 GDP Data REST Book 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-world-gdp.png?raw=true
 "World 🌐 GDP Data REST Book 📓")

## Text Oputput View

Data Table 🈸 renderer displays data that is not in `CSV`, [`GeoJSON`](https://www.rfc-editor.org/rfc/rfc7946.html) or `JSON` **array** data format in a scrollable text container:

![Text Output Notebook 📓 View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-text-output.png?raw=true
 "Text Output Notebook 📓 View")

## Data Table Renderers Extension Dependency

You can add our Data Table 🈸 Notebook 📓 Renderers dependency to your custom VSCode notebook kernels to enable users of your custom notebooks to view data with our Data Table renderers by declaring extension dependency in your VSCode extension `package.json`:

```
"extensionDependencies": [
		"RandomFractalsInc.vscode-data-table"
	],
```

See VSCode [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest) doc for more info.

# Recommended Extensions

Recommended extensions for working with Interactive Notebooks 📚, data 🈸, charts 📈, and geo 🗺️ data formats in [VSCode](https://code.visualstudio.com/):

| Extension | Description |
| --- | --- |
| [Data Preivew 🈸](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview) | Data Preview 🈸 extension for importing 📤 viewing 🔎 slicing 🔪 dicing 🎲 charting 📊 & exporting 📥 large JSON array/config, YAML, Apache Arrow, Avro & Excel data files |
| [Geo Data Viewer 🗺️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.geo-data-viewer) | [kepler.gl](https://kepler.gl) Geo Data Analytics tool to gen. some snazzy 🗺️s  w/0 `Py` 🐍 `pyWidgets` ⚙️ `pandas` 🐼 or `react` ⚛️ |
| [Vega Viewer 📈](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-vega-viewer) | Provides Interactive Preview of Vega & Vega-Lite maps 🗺️ & graphs 📈 |
| [Leaflet 🍃 Map 🗺️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-leaflet) | Leaflet 🍃 Map 🗺️ for Notebook 📓 cell ⌗ data outputs |
| [JS Notebook 📓 Inspector 🕵️](https://github.com/RandomFractals/js-notebook-inspector) | Provides Interactive Preview of [Observable JS Notebooks](https://observablehq.com/documentation#notebook-fundamentals) 📚, Notebook 📓 nodes ⎇ & cells ⌗ source code |
| [Observable JS](https://marketplace.visualstudio.com/items?itemName=GordonSmith.observable-js) | Observable Notebooks 📚 Interpreter with VSCode Notebook view support, [Observable](https://observablehq.com/@observablehq/observable-for-jupyter-users?collection=@observablehq/observable-for-jupyter-users) `js` and `md` code outlines and previews |
| [DeltaXML XPath Notebook](https://marketplace.visualstudio.com/items?itemName=deltaxml.xpath-notebook) | XPath 3.1 Notebook 📓 for Visual Studio Code |
# Dev Log

See [#DataTableView 🈸](https://twitter.com/hashtag/DataTableView?src=hashtag_click&f=live) & [#DataTableRenderers](https://twitter.com/hashtag/DataTableRenderers?src=hashtag_click&f=live) tags on our [Twitter](https://twitter.com/TarasNovak) feed for the latest & greatest updates on this vscode extension & what's next in store for new data tools in vscode.

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

Open an [issue](https://github.com/RandomFractals/vscode-data-table/issues) or create a pull request to make this Data Table 🈸 Renderers vscode notebooks 📚 extension work better for all.

# Backers

<a href='https://ko-fi.com/dataPixy' target='_blank'>
  <img height='36' style='border:0px;height:36px;' border='0'
    src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2'
    alt='support me on ko-fi.com' />
</a>
