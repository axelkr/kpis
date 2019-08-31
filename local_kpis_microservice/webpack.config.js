const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

const commonConfiguration = {
  entry: {
    root: './src/main.ts'
  },
  resolve: {
    extensions: ['.ts','.js','.mjs']
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.ts(x?)$/, exclude: /node_modules/, loader: "ts-loader" },
      { test: /\.mjs$/, include: /node_modules/,  type: "javascript/auto"}
    ]
  },
  target: 'node',
  plugins: [ 
  ]
};


module.exports = env => {
  var configuration = commonConfiguration;
  const isProductionBuild = env instanceof Object && env.production;
   configuration.mode = (isProductionBuild ? 'production' : 'development');
  if (isProductionBuild) {
    configuration.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|en/));
  }
  return configuration;
};

