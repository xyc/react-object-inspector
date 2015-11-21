var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/only-dev-server',
    './js/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'js'),
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader'
        loader: ['style', 'style!css']
      }
    ]
  }
};
