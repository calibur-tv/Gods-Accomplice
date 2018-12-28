const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const TemplateHashPlugin = require('./plugin/TemplateHashPlugin')
const baseWebpackConfig = require('./wp.config.base')
const envConfig = require('./env.config')

const {
  // APP_PATH,
  // LIB_PATH,
  BUILD_PATH
  // VENDOR_PATH,
  // ROOT_PATH,
} = envConfig.PATH

module.exports = (env = {}) => {
  const isPro = env.pro === true
  const config = isPro ? envConfig.build : envConfig.staging

  const webpackConfig = merge(baseWebpackConfig('production'), {
    devtool: false,
    output: {
      publicPath: `${config.cdn}/hybrid/`
    },
    module: {
      rules: []
    },

    plugins: [
      new HtmlWebpackInlineSourcePlugin(),
      new MinifyPlugin(
        {},
        {
          sourceMap: false
        }
      ),
      /*
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      }),
      */
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new FriendlyErrorsPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new TemplateHashPlugin({
        outputAssetsPath: BUILD_PATH,
        templatesSubPath: 'templates/',
        publicPath: `${config.cdn}/hybrid`
      })
    ]
  })

  if (process.env.npm_config_report) {
    // eslint-disable-next-line prefer-destructuring
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 9999
      })
    )
  }

  return webpackConfig
}
