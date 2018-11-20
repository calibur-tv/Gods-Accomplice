const path = require('path')

exports.assetsPath = function assetsPath(base, _path) {
  return path.posix.join(base, _path)
}

exports.jsonStringifyObj = (obj = {}) => {
  const newObj = {}
  Object.keys(obj).forEach(k => {
    newObj[k] = JSON.stringify(obj[k])
  })
  return newObj
}

exports.log = (...args) => {
  console.log(':::========:::', ...args)
}
