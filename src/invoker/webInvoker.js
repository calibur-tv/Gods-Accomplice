/* eslint-disable */
import invokerInterface from './invokerInterface'

export default class extends invokerInterface {
  getDeviceInfo(callback) {
    this.JsCallApp('getDeviceInfo', {}, callback)
  }

  toWebview(page, params) {
    this.JsCallApp('toWebview', { page, params })
  }

  toNative(page, params) {
    this.JsCallApp('toNative', { page, params })
  }

  previewImages({ images, index }) {
    this.JsCallApp('previewImages', { images, index })
  }

  JsCallApp(func, params, callback) {
    console.log(func, params, callback)
  }

  appCallJs(jsonObj) {
    let paramsObj
    try {
      paramsObj = JSON.parse(jsonObj)
    } catch (e) {
      paramsObj = {}
    }

    const func = paramsObj.func
    const params = paramsObj.params || {}
    const callbackId = paramsObj.callbackId
    const jsFunction = this.jsFuncs[func]

    if (!jsFunction || typeof jsFunction !== 'function') {
      return
    }

    const data = jsFunction.call(this, params)
    console.log(func, params, callbackId, data)
  }
}
