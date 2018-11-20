const express = require('express')
const path = require('path')
const fs = require('fs')
const expressListRoutes = require('express-list-routes')

const rootRouter = express.Router()
const dataRootPath = path.resolve(path.resolve(__dirname), '..', 'data')

const addRoute = appName => {
  const router = express.Router()
  const dataPath = path.resolve(dataRootPath, appName)

  // 如果是 . 开头的文件，则跳过
  if (dataPath.split('/').pop()[0] === '.') {
    return router
  }
  // 模板对应的mock数据
  const tplDataMap = fs
    .readdirSync(dataPath)
    .filter(_ => _[0] !== '.') // 过滤以 . 开头的文件
    .reduce((result, file) => {
      const filePath = path.resolve(dataPath, file)
      const fileName = path
        .basename(file, '.json')
        .replace(new RegExp(`^${appName}-`), '')
      result[fileName] = {
        data: JSON.stringify(require(filePath))
      }
      return result
    }, {})

  Object.keys(tplDataMap).forEach(version => {
    const majorVersion = version.split('-')[0]
    router.get(`/${version}`, (req, res) => {
      res.render(
        `${appName}/${majorVersion}/${majorVersion}`,
        tplDataMap[version]
      )
    })
  })
  expressListRoutes({ prefix: `/${appName}` }, `【${appName}】`, router)
  return router
}

// init the router
fs.readdirSync(dataRootPath).forEach(file => {
  rootRouter.use(`/${file}`, addRoute(file))
})
// define the home page route
rootRouter.get('/', (req, res) => {
  res.send('Birds home page1')
})

module.exports = rootRouter
