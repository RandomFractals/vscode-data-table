/* eslint-disable @typescript-eslint/naming-convention */
const path = require('path');

const devServerPort = 8111;

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    dataTable: './src/renderer/dataTable.ts',
    dataSummary: './src/renderer/dataSummary.ts',
    flatDataGrid: '/src/renderer/flatDataGrid.ts'
  },
  output: {
    path: path.join(__dirname, 'out', 'renderer'),
    filename: '[name].js',
    publicPath: '',
    libraryTarget: 'module',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      // allow importing ts(x) files:
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'src/renderer/tsconfig.json',
          // transpileOnly enables hot-module-replacement
          transpileOnly: true,
          compilerOptions: {
            // overwrite the noEmit renderers tsconfig
            noEmit: false,
          },
        },
      },
      // allow importing CSS modules
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    port: devServerPort,
    hot: true,
    // disable host check, otherwise the bundle running in vscode
    // won't be able to connect to the dev server
    disableHostCheck: true,
    writeToDisk: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
});
