const path = require('path');

module.exports = {
  entry: {
    root: './src/root.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-url-loader'},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  }
};
