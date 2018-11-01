const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./wp.config.base');
const envConfig = require('./env.config');

const config = envConfig.dev;

module.exports = merge(baseWebpackConfig('development'), {
  devtool: '#source-map',

  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: config.assetsPublicPath,
  },

  module: {
    rules: [],
  },

  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.env,
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
