import invokerInterface from './invokerInterface'

export default class extends invokerInterface {
  JsCallApp(func, params, callback) {
    // eslint-disable-next-line
    console.log(func, params, callback)
  }

  getDeviceInfo(callback) {
    this.JsCallApp('getDeviceInfo', {}, callback)
  }
}
