module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-url-loader'},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  }
};
