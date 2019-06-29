const path = require('path')
const grunt = require('grunt')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./env.config')
const utils = require('./utils')
const resolve = file => path.resolve(__dirname, file)
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const { APP_PATH, LIB_PATH, BUILD_PATH, ROOT_PATH } = config.PATH

const OUTPUT_PREFIX = 'templates' // 模板输出的目录前缀
const isProduction = process.env.NODE_ENV === 'production'
const useCssSourceMap = !isProduction

module.exports = env => {
  const isPro = env === 'production'
  const assetsBasePath = isPro
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // webpack 入口文件
  const entries = {}

  // 模板文件目录
  const tplPath = path.resolve(APP_PATH, './tpl')

  // 这里是将模板文件提取至entry，生成对应的js、css、和mustache文件
  const templatePlugins = []

  // 增加模板文件至entry
  grunt.file.recurse(tplPath, (abspath, rootdir, subdir, filename) => {
    // 获得文件名和扩展名
    const fArray = filename.split('.')
    const baseName = fArray[0]
    const ext = fArray.pop()

    // if (subdir.indexOf('haruki') > -1 && baseName === 'v5' && ext === 'js') {
    if (ext === 'js') {
      // noteView/hugo/v9 --> hugo/v9
      const subPath = subdir.replace(/^[a-z]+\//i, '')
      const chunk = `${OUTPUT_PREFIX}/${isPro ? subdir : subPath}/${baseName}`
      const tpl = path.resolve(abspath, '..', `${baseName}.mustache`)
      entries[chunk] = abspath
      const htmlPlugin = new HtmlWebpackPlugin({
        template: `html-loader!${tpl}`,
        // 如果不是开发环境，就添加hash
        filename: isPro ? `${chunk}-[chunkhash].mustache` : `${chunk}.mustache`,
        chunks: [chunk],
        inlineSource: '.js$'
      })
      templatePlugins.push(htmlPlugin)
    }
  })

  return {
    context: APP_PATH,
    entry: entries,

    output: {
      path: BUILD_PATH,
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js'
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: useCssSourceMap,
                    minimize: isProduction
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: useCssSourceMap
                  }
                },
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      resolve('../../src/style/variables.scss'),
                      resolve('../../src/style/mixins.scss')
                    ]
                  }
                }
              ]
            },
            postcss: [
              require('autoprefixer')({
                browsers: ['last 3 versions']
              })
            ],
            cssSourceMap: useCssSourceMap,
            cssModules: {
              localIdentName: '[local]-[hash:base64:5]',
              camelCase: true
            }
          }
        },
        {
          test: /\.(js|vue)?$/,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {}
            }
          ],
          include: [APP_PATH],
          exclude: [LIB_PATH]
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath(assetsBasePath, 'img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath(
              assetsBasePath,
              'fonts/[name].[hash:7].[ext]'
            )
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': APP_PATH,
        images: path.join(APP_PATH, 'images')
      }
    },

    plugins: [
      new LodashModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          API_HOST: JSON.stringify(
            process.env.API_HOST || 'https://api.calibur.tv/'
          )
        }
      }),
      new webpack.HashedModuleIdsPlugin({
        hashDigestLength: 8
      }),
      ...templatePlugins,
      new CleanWebpackPlugin([BUILD_PATH], {
        root: ROOT_PATH
      })
    ],
    externals: {}
  }
}
