import IosInvoker from './iosInvoker'
import AndroidInvoker from './androidInvoker'
import WebInvoker from './webInvoker'

export default class {
  constructor({ appName, appVersion }) {
    this.appName = appName.toLowerCase()
    this.appVersion = appVersion.toLowerCase()
    return this.init()
  }

  init() {
    const data = {
      appName: this.appName,
      appVersion: this.appVersion
    }
    if (this.appName === 'ios') {
      return new IosInvoker(data)
    }
    if (this.appName === 'android') {
      return new AndroidInvoker(data)
    }
    return new WebInvoker(data)
  }
}
