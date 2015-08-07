var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname, 
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
      }
    ]
  }
};
