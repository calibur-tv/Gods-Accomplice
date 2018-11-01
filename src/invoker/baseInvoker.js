import appJsFunctions from "./appJsFunctions";

class BaseInvoker {
  constructor(appName, appVersion) {
    this.appName = appName;
    this.appVersion = appVersion;

    // 客户端 Native 可以调用的 Javascript Function
    this.appJsFunctions = appJsFunctions;

    // Callback 注册表
    this.callbackRegistry = {};
  }

  //
  // 下面用于处理 Js call App
  //

  /**
   * [registerCallback js调用app时， 创建callbackId和callback关系, 并把生成的键值对放入 callbackRegistry]
   * @param {function} callback
   * @return {string}
   */
  registerCallback(callback) {
    const callbackId = Math.random()
      .toString(36)
      .substr(2, 16);
    this.callbackRegistry[callbackId] = callback;
    return callbackId;
  }

  /**
   * [callApp 调用app]
   * @param {string} func 被调用的方法名
   * @param {Object} args 被调用方法参数
   * @param {function} callback 回调方法
   * @return {Object}
   */
  callApp(func, args = {}, callback = null) {
    // eslint-disable-next-line no-unused-expressions
    console.log && console.log("[call app]", func, args, callback);
    // 生成 callback, callbackId 对应关系并返回 callbackId
    let callbackId = "-1";

    if (callback !== null && typeof callback === "function") {
      callbackId = this.registerCallback(callback);
    }

    const params = JSON.stringify({ func, args, callbackId });
    try {
      if (typeof _JSNB !== "undefined" && _JSNB) {
        return _JSNB.handleMessageFromJS(params);
      }
      return window.webkit.messageHandlers.handleMessageFromJS.postMessage(
        params
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * [appCallbackHandler App 将数据回调给 JS 的入口方法]
   * @param {String} params
   * @return {void}
   */
  appCallbackHandler(params) {
    const paramsObj = JSON.parse(params);
    const { callbackId } = paramsObj;
    const args = paramsObj.args || {};
    if (!callbackId || callbackId === "-1") return;
    const callback = this.callbackRegistry[callbackId];
    if (!!callback && typeof callback === "function") {
      callback(args);
    }
  }

  //
  // 下面用于处理 App call Js
  //

  /**
   * [appCallHandler App 请求 JS 方法的入口方法]
   * @param  {String} params 一个包含所有参数的 JSON 字符串
   * @return {void}
   */
  appCallHandler(params) {
    // 解析参数，获取 func, args, callback_id
    const paramsObj = JSON.parse(params);

    const { func } = paramsObj;
    const args = paramsObj.args || {};
    const { callbackId } = paramsObj;
    const jsFunction = this.appJsFunctions[func];

    if (!jsFunction || typeof jsFunction !== "function") {
      return;
    }
    // 调取对应方法，获取数据, 把方法的作用域绑定到 M.invoker上
    const data = jsFunction.call(this, args);
    // console.log(data);
    // 请求回调
    if (callbackId !== "-1") {
      this.callAppCallback(callbackId, data);
    }
  }

  /**
   * [callAppCallback 将数据回调给 App]
   * @param  {Number} callbackId App 提供的 callbackId
   * @param  {String} args 一个包含所有参数的 JSON 字符串
   * @return {void}
   */
  callAppCallback(callbackId, args) {
    if (typeof _JSNB !== "undefined" && _JSNB) {
      _JSNB.handleCallbackFromJS(JSON.stringify({ callbackId, args }));
    } else {
      // eslint-disable-next-line max-len
      window.webkit.messageHandlers.handleCallbackFromJS.postMessage(
        JSON.stringify({ callbackId, args })
      );
    }
  }

  /**
   * [openSecureSession 打开安全模式验证]
   *
   * @param  {Integer} callbackId App 提供的 callbackId
   * @param  {String} params 一个包含所有参数的 JSON 字符串
   * @return {void}
   */
  openSecureSession(successCallback) {
    this.callApp("Core.Global.SecureSession", {}, successCallback);
  }

  /**
   * [openSecureSession 打开安全模式验证]
   *
   * @param  {Integer} callbackId App 提供的 callbackId
   * @param  {String} params 一个包含所有参数的 JSON 字符串
   * @return {void}
   */
  openBindMobileNumber(successCallback) {
    this.callApp("Core.Global.BindMobileNumber", {}, successCallback);
  }
}

export default BaseInvoker;
