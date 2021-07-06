/* eslint-disable @typescript-eslint/naming-convention */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');

const outputFilename = 'index.js';
const devServerPort = 8111;

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: './src/renderer/index.ts',
  output: {
    path: path.join(__dirname, 'out', 'renderer'),
    filename: outputFilename,
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
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
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
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        tsconfig: 'src/renderer/tsconfig.json',
      },
    }),
    new DefinePlugin({
      // path from the output filename to the output directory
      __webpack_relative_entrypoint_to_root__: JSON.stringify(
        path.posix.relative(path.posix.dirname(`/${outputFilename}`), '/'),
      ),
      scriptUrl: 'import.meta.url',
    }),
  ],
});
