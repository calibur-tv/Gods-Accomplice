import invokerInterface from './invokerInterface'

export default class extends invokerInterface {
  getDeviceInfo(callback) {
    this.JsCallApp('getDeviceInfo', {}, callback)
  }
  /**
   * App 主动调用 JS 的函数
   * @param {JSON} jsonObj
   */
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
    // 请求回调
    if (callbackId) {
      this.appCallJsCallback(callbackId, data)
    }
  }

  /**
   * js 去主动调用 app 的函数
   * @param {String} func
   * @param {Object} params
   * @param {Function} callback
   */
  JsCallApp(func, params = {}, callback = null) {
    // 生成 callback, callbackId 对应关系并返回 callbackId
    let callbackId = ''
    if (callback !== null && typeof callback === 'function') {
      callbackId = this.registerCallbackId(callback)
    }

    const data = JSON.stringify({ func, params, callbackId })
    try {
      window.__AndroidBridge.handleMessageFromJS(data)
    } catch (e) {
      M.sentry.captureException(e)
    }
  }

  /**
   * 注册一个 callbackId，供 APP 执行完代码后，回调到 JS 然后根据 id 执行函数
   * @param {Function} callback
   */
  registerCallbackId(callback) {
    const callbackId = Math.random()
      .toString(36)
      .substr(2, 16)
    this.handler[callbackId] = callback
    return callbackId
  }

  /**
   * App 在执行完 JS 的调用后，主动调用 JS 的这个函数，进行回调的执行
   * @param {JSON} jsonObj
   */
  JsCallAppCallback(jsonObj) {
    let paramsObj
    try {
      paramsObj = JSON.parse(jsonObj)
    } catch (e) {
      paramsObj = {}
    }

    const callbackId = paramsObj.callbackId
    const params = paramsObj.params || {}

    if (!callbackId) {
      return
    }

    const callbackFunc = this.handler[callbackId]
    if (!!callbackFunc && typeof callbackFunc === 'function') {
      callbackFunc(params)
    }
  }

  /**
   * JS 在执行完 APP 的调用后，根据 callbackId，主动去调用 APP 的一个函数
   * @param {String} callbackId
   * @param {Object} params
   */
  appCallJsCallback(callbackId, params) {
    return window.__AndroidBridge.handleCallbackFromJS(
      JSON.stringify({ callbackId, params })
    )
  }
}
