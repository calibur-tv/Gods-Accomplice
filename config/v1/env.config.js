const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../..')
const APP_PATH = path.resolve(ROOT_PATH, 'src')
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const LIB_PATH = path.resolve(ROOT_PATH, 'node_modules')
const VENDOR_PATH = path.resolve(ROOT_PATH, 'vendor')

const PATH = {
  ROOT_PATH,
  APP_PATH,
  BUILD_PATH,
  LIB_PATH,
  VENDOR_PATH
}

const publicPath = '/'
module.exports = {
  PATH,
  dev: {
    env: {
      ENVIRONMENT: '"development"',
      NODE_ENV: '"development"'
    },
    cdn: '',
    assetsPublicPath: publicPath,
    assetsSubDirectory: 'static',
    proxyTable: {},
    assetsFiles: [
      {
        path: 'example.js'
        // attributes: {
        //   async: 'async',
        //   defer: 'defer',
        // },
      },
      {
        path: 'example.css'
      }
    ],
    cssSourceMap: true
  },
  build: {
    env: {
      ENVIRONMENT: '"production"',
      NODE_ENV: '"production"'
    },
    cdn: 'https://static.calibur.tv',
    assetsFiles: [
      {
        path: 'example.js'
        // attributes: {
        //   async: 'async',
        //   defer: 'defer',
        // },
      }
    ],
    assetsPublicPath: publicPath,
    assetsSubDirectory: 'static',
    productionSourceMap: false,
    productionGzipExtensions: ['js', 'css', 'mustache'],
    addTestCodeInTemplates: false
  }
}
