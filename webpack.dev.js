const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RUN_ENV': JSON.stringify('development')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: true
  },
  devtool: 'inline-source-map'
});