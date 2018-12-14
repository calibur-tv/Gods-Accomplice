import func from './func'

export default class {
  constructor({ appName, appVersion }) {
    this.name = appName
    this.version = appVersion
    this.jsFuncs = func
    this.handler = {}
  }
}
