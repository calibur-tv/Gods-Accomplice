import invokerInterface from './invokerInterface'

export default class extends invokerInterface {
  getDeviceInfo(callback) {
    this.JsCallApp('getDeviceInfo', {}, callback)
  }
}
