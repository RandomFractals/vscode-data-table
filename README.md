# vscode-data-table

<h1 align="center">
  <img width="128" height="128" src="resources/images/data-table.png" />
  <br />
  Data Table for Notebook 📓 cell ⌗ data outputs
</h1>

See [Data Preview](https://github.com/RandomFractals/vscode-data-preview) 🈸 vscode extension for a generic [Grid Data Viewer](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview) with many common data formats support, search, sort, filters, grouping, splits, pivot tables, aggregates, and basic charts 📊

## Data Table 🈸 Renderer View

![Data Table 🈸 Renderer View](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-renderer.png?raw=true 
 "Data Table 🈸 Renderer View")

## 🈸 Features

- View `CSV` and `JSON` array data cell output in a simple html table with column sort, number, and date formatting.

...

## 🈸 Examples

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

## Pyolite Notebook Example

1. Install [Pyolite Notebooks](https://marketplace.visualstudio.com/items?itemName=joyceerhl.vscode-pyolite) 📚 vscode extension

2. Load [Chicago Red Light Cameras](https://github.com/RandomFractals/vscode-data-table/blob/main/notebooks/chicago-red-light-cameras.ipynb) Pyolite Notebook 📓

3. Run All cells ⌗:

![Chicago Red Light Cameras Pyolite Notebook 📓](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-pyolite-notebook.png?raw=true 
 "Chicago Red Light Cameras Pyolite Notebook 📓")

# Recommended Extensions

Other recommended extensions for working with Interactive Notebooks 📚, data 🈸, charts 📈, and geo data formats 🗺️ in [VSCode](https://code.visualstudio.com/):

| Extension | Description |
| --- | --- |
| [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) | Notebook extension for running REST queries |
| [TypeScript Notebooks](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) | TypeScript with Jupyter Notebooks |
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
