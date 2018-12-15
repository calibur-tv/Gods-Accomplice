import func from './func'

export default class {
  constructor({ appName, appVersion }) {
    this.name = appName
    this.version = appVersion
    this.jsFuncs = func
    this.handler = {}
  }

  appCallJs() {
    /* App 主动调用 JS */
  }

  JsCallApp() {
    /* JS 主动调用 APP */
  }
}
