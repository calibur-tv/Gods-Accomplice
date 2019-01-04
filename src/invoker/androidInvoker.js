import invokerInterface from './invokerInterface'
import scheme from './scheme/android'
import funcList from './func'

export default class extends invokerInterface {
  getDeviceInfo(callback) {
    this.JsCallApp('getDeviceInfo', {}, callback)
  }

  getUserInfo(callback) {
    this.JsCallApp('getUserInfo', {}, callback)
  }

  setUserInfo(data) {
    this.JsCallApp('setUserInfo', data)
  }

  logout() {
    this.JsCallApp('logout')
  }

  toNative(page, data = null) {
    let uri = scheme[page]
    if (data) {
      uri = `${uri}?`
      Object.keys(data).forEach(key => {
        uri += `${key}=${data[key]}&`
      })
      uri = uri.slice(0, -1)
    }
    this.JsCallApp('toNativePage', { uri })
  }

  toggleClick({ model, type, id, result }) {
    this.JsCallApp('toggleClick', { model, type, id, result })
  }

  readNotification({ count }) {
    this.JsCallApp('readNotification', { count })
  }

  previewImages({ images, index }) {
    this.JsCallApp('previewImages', { images, index })
  }

  createMainComment({ model_type, model_id }) {
    this.JsCallApp('createMainComment', { model_type, model_id })
  }

  createSubComment({
    model_type,
    parent_comment_id,
    target_user_id,
    target_user_name
  }) {
    this.JsCallApp('createSubComment', {
      model_type,
      parent_comment_id,
      target_user_id,
      target_user_name
    })
  }

  toast({ type, text }) {
    this.JsCallApp('showToast', { type, text })
  }

  alert({ title, message, buttonText } = {}, callback) {
    const sendTitle = title || '提示'
    const sendButtonText = buttonText || '确认'
    this.JsCallApp(
      'show-alert',
      { title: sendTitle, message, buttonText: sendButtonText },
      callback
    )
  }

  confirm({
    title,
    message,
    cancelButtonText,
    submitButtonText,
    callback
  } = {}) {
    const sendTitle = title || '提示'
    const sendMessage = message || ''
    const sendCancelButtonText = cancelButtonText || '取消'
    const sendSubmitButtonText = submitButtonText || '确认'
    this.JsCallApp(
      'showConfirm',
      {
        title: sendTitle,
        message: sendMessage,
        cancelButtonText: sendCancelButtonText,
        submitButtonText: sendSubmitButtonText
      },
      res => {
        if (res.result && typeof callback === 'function') {
          callback()
        }
      }
    )
  }

  prompt({
    title,
    message,
    inputType,
    maxLength,
    cancelButtonText,
    submitButtonText,
    callback
  } = {}) {
    const sendTitle = title || '提示'
    const sendMessage = message || ''
    const sendCancelButtonText = cancelButtonText || '取消'
    const sendSubmitButtonText = submitButtonText || '确认'
    const sendInputType = inputType || 'text'
    const sendMaxLength = maxLength || 0
    this.JsCallApp(
      'showPrompt',
      {
        title: sendTitle,
        message: sendMessage,
        maxLength: sendMaxLength,
        inputType: sendInputType,
        cancelButtonText: sendCancelButtonText,
        submitButtonText: sendSubmitButtonText
      },
      callback
    )
  }

  /**
   * App 主动调用 JS 的函数
   * @param {JSON} jsonObj
   */
  appCallJs(jsonObj) {
    try {
      const paramsObj = JSON.parse(jsonObj)
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
    } catch (e) {
      funcList.log({
        message: 'JsCallAppCallback error',
        func_type: typeof func,
        params_type: typeof params,
        callbackId_type: typeof callbackId,
        error: e
      })
      M.sentry.captureException(e)
    }
  }

  /**
   * js 去主动调用 app 的函数
   * @param {String} func
   * @param {Object} params
   * @param {Function} callback
   */
  JsCallApp(func, params = {}, callback = null) {
    try {
      // 生成 callback, callbackId 对应关系并返回 callbackId
      let callbackId = ''
      if (callback !== null && typeof callback === 'function') {
        callbackId = this.registerCallbackId(callback)
      }
      const data = JSON.stringify({ func, params, callbackId })
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
    try {
      const paramsObj = JSON.parse(jsonObj)
      const callbackId = paramsObj.callbackId
      const params = paramsObj.params || {}

      if (!callbackId) {
        return
      }

      const callbackFunc = this.handler[callbackId]
      if (!!callbackFunc && typeof callbackFunc === 'function') {
        callbackFunc(params)
      }
    } catch (e) {
      M.sentry.captureException(e)
    }
  }

  /**
   * JS 在执行完 APP 的调用后，根据 callbackId，主动去调用 APP 的一个函数
   * @param {String} callbackId
   * @param {Object} params
   */
  appCallJsCallback(callbackId, params) {
    try {
      return window.__AndroidBridge.handleCallbackFromJS(
        JSON.stringify({ callbackId, params })
      )
    } catch (e) {
      M.sentry.captureException(e)
    }
  }
}
