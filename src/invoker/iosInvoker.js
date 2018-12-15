import invokerInterface from './invokerInterface'

export default class extends invokerInterface {
  constructor(data) {
    super(data)
    this.registerAppCallJsHnandler()
  }

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
            callback(responseData)
          }
        }
      )
    })
  }

  registerAppCallJsHnandler() {
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