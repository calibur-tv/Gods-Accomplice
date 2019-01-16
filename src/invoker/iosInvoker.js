import invokerInterface from './invokerInterface'
import scheme from './scheme/ios'

export default class extends invokerInterface {
  constructor(data) {
    super(data)
    this.registerAppCallJsHnandler()
  }

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

  createEditorSection({ type, id }, callback) {
    this.JsCallApp('createEditorSection', { type, id }, callback)
  }

  editEditorSection({ type, id, data }, callback) {
    this.JsCallApp('editEditorSection', { type, id, data }, callback)
  }

  editEditorImageSection({ id, type, data }, callback) {
    this.JsCallApp('editEditorImageSection', { type, id, data }, callback)
  }

  editEditorTextSection({ id, type, data }, callback) {
    this.JsCallApp('editEditorTextSection', { type, id, data }, callback)
  }

  sendEditorContent({ content }) {
    this.JsCallApp('sendEditorContent', { content })
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
    let paramsObj
    try {
      paramsObj = JSON.parse(jsonObj)
    } catch (e) {
      paramsObj = {}
    }
    const func = paramsObj.func
    const params = paramsObj.params || {}
    const jsFunction = this.jsFuncs[func]

    if (!jsFunction || typeof jsFunction !== 'function') {
      return
    }

    return jsFunction.call(this, params)
  }

  /**
   * js 去主动调用 app 的函数
   * @param {String} func
   * @param {Object} params
   * @param {Function} callback
   */
  JsCallApp(func, params = {}, callback = null) {
    try {
      this.setupWebViewJavascriptBridge(bridge => {
        // Javascrit call Object-C
        bridge.callHandler(
          'mpWebBridge',
          {
            func: 'handleMessageFromJS',
            params: JSON.stringify({ func, params })
          },
          function responseCallback(responseData) {
            if (callback && typeof callback === 'function') {
              callback(JSON.parse(responseData))
            }
          }
        )
      })
    } catch (e) {
      M.sentry.captureException(e)
    }
  }

  registerAppCallJsHnandler() {
    try {
      this.setupWebViewJavascriptBridge(bridge => {
        // Object-C call Javascript
        bridge.registerHandler('mpWebBridge', (data, responseCallback) => {
          const result = this.appCallJs(data)
          if (result === undefined) {
            return
          }
          responseCallback(JSON.stringify({ params: result }))
        })
      })
    } catch (e) {
      M.sentry.captureException(e)
    }
  }

  // Doc：https://github.com/marcuswestin/WebViewJavascriptBridge#usage
  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}
