const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const md5 = require('blueimp-md5')
const redis = require('redis')

function isDir(folder) {
  return fs.statSync(folder).isDirectory()
}

function isFile(file) {
  return fs.statSync(file).isFile()
}

class TemplateHashPlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        outputAssetsPath: path.join(process.cwd(), 'dist'),
        publicPath: 'https://file.calibur.tv'
      },
      options || {}
    )
    this.suppressErrors = options.suppressErrors || false
    this.manifestFilePrefix = 'sprockets-manifest'
  }

  apply(compiler) {
    const { outputAssetsPath, templatesSubPath, publicPath } = this.options
    const templatesPath = path.join(outputAssetsPath, templatesSubPath)
    const manifest = {}
    const types = {}

    compiler.plugin('done', stats => {
      // 重写hash并写入manifest
      if (!fs.existsSync(templatesPath)) {
        this.handleErrors(`no such dir ${templatesPath}`, stats.compilation)
      }
      this.handleTemplates(
        templatesPath,
        (absPath, rootPath, subPath, file) => {
          const fileArray = file.split('.')
          const ext = fileArray.pop()
          let fileAbsPath = absPath
          if (ext !== 'mustache') {
            return
          }
          const files = fs.readdirSync(path.join(rootPath, subPath))
          // 同目录下的js file
          // eslint-disable-next-line no-shadow
          const jsFile = _.filter(files, file => /\.js$/.test(file))[0]
          const jsHash = jsFile.split('.')[0] // js的hash
          const oldHash = fileArray[0] // 模板的hash
          const chunkHash = md5(jsHash + oldHash) // js文件与mustache文件任一变化均视为变化
          const mustacheContent = fs.readFileSync(fileAbsPath, 'utf-8')
          const contentHash = md5(mustacheContent) // 内容hash

          const version = jsFile.split('-')[0]
          const newHash = `${version}-${chunkHash}-${contentHash}`
          const newMustache = `${newHash}.mustache`
          const newFileAbsPath = path.join(rootPath, subPath, newMustache)
          fs.renameSync(fileAbsPath, newFileAbsPath)
          // 写manifest
          const tplType = subPath.split('/')[0]
          const appName = _.kebabCase(subPath.split('/')[1])
          manifest[`${appName}-${version}`] = {
            build: chunkHash,
            file: `${publicPath}/${path.join(
              templatesSubPath,
              subPath,
              newMustache
            )}`
          }
          types[`${appName}-${version}`] = tplType
        }
      )
      // test code
      const manifestContent = JSON.stringify(manifest, null, 2)
      const manifestFileName = `${this.manifestFilePrefix}.json`
      const outputManifestFile = path.join(outputAssetsPath, manifestFileName)

      // 写最新的manifest
      fs.writeFileSync(outputManifestFile, manifestContent)
    })
  }

  handleTemplates(dirPath, callback, rootPath) {
    if (!rootPath) {
      // eslint-disable-next-line no-param-reassign
      rootPath = dirPath
    }
    fs.readdirSync(dirPath).forEach(itemPath => {
      const file = path.join(dirPath, itemPath)
      if (!fs.existsSync(file)) {
        return
      }
      if (isDir(file)) {
        this.handleTemplates(file, callback, rootPath)
      } else if (isFile(file)) {
        callback(file, rootPath, dirPath.replace(rootPath, ''), itemPath)
      }
    })
  }

  handleErrors(err, compilation) {
    const errorMsg = `TemplateHashPlugin:: ${err}`
    if (this.suppressErrors) {
      compilation.warnings.push(errorMsg)
    } else {
      compilation.errors.push(errorMsg)
    }
  }
}

module.exports = TemplateHashPlugin
