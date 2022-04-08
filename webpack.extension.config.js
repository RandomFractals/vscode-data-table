const path = require('path');
const configFileName = 'src/extension/tsconfig.json';

module.exports = {
  // context: path.dirname(__dirname),
  target: 'node',
  entry: {
    extension: './src/extension/extension.ts'
  },
  output: {
    filename: 'extension.js',
    path: path.join(__dirname, 'out', 'extension'),
    libraryTarget: 'commonjs2'
  },
  mode: 'production',
  devtool: 'source-map',
  externals: ['vscode', 'commonjs'],
  resolve: {
    extensions: ['.ts', '.js']
  },
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: configFileName,
              reportFiles: ['src/extension/**/*.{ts,tsx}']
            }
          }
        ]
      }
    ]
  }
};
