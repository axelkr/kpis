const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

const commonConfiguration = {
  entry: {
    root: './src/root.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-url-loader'},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|en/)
  ]
};


module.exports = env => {
  var configuration = commonConfiguration;
  const isProductionBuild = env instanceof Object && env.production;
  var mode = 'development';
  if (isProductionBuild) {
    mode = 'production';
  }
  configuration.mode = mode;
  return configuration;
};

