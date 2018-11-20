/**
 * Created by zad on 17/6/6.
 */
import BaseInvoker from './baseInvoker'
import { isAndroid, isIOS } from '../util/browser'

const mockPromise = (time = 3000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, time)
  })

class TemplateInvoker extends BaseInvoker {
  constructor(appName, appVersion, fns) {
    super(appName, appVersion)
    this.appJsFunctions = Object.assign({}, this.appJsFunctions, fns)
  }

  /**
   * 获取认证 header
   */
  async getApiSignatures() {
    if (isAndroid()) {
      const result = this.callApp('Core.Global.Apiheaders', {}, -1)
      try {
        return JSON.parse(result || '{}')
      } catch (e) {
        return {}
      }
    } else if (isIOS()) {
      // 获取签名头
      const signaturePromise = new Promise(resolve => {
        this.callApp('Core.Global.Apiheaders', {}, headers => {
          resolve(headers)
        })
      })
      // 设置最短的等待时间
      const timeoutPromise = mockPromise(800)
      return Promise.race([signaturePromise, timeoutPromise])
    }
    // default
    return {}
  }
}

export default TemplateInvoker
