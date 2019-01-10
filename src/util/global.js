import Vue from 'vue'
import toast from './toast'
import resizeImage from './resizeImage'
import utils from './func'
import Sentry from './sentry'
import Invoker from '@/invoker/index'
import alias from './alias'
import { MessageBox } from 'mint-ui'

window.M = window.M || Object.create(null)

const appVersion = document.querySelector('meta[name=app-version]').content
const appName = document.querySelector('meta[name=app-name]').content
const channel = new Vue()

M.sentry = new Sentry({ appName, appVersion })
M.invoker = new Invoker({ appName, appVersion })
M.channel = channel
M.user = {}
M.invoker.getUserInfo(data => {
  M.user = data
  M.sentry.configureScope(scope => {
    scope.setUser({
      id: data.id
    })
  })
})
M.invoker.getDeviceInfo(data => {
  M.sentry.configureScope(scope => {
    scope.setTag('device-info', data)
    scope.setTag('error-type', 'init')
  })
})

Vue.use({
  install(Vue) {
    Vue.prototype.$alias = alias

    Vue.prototype.$utils = utils

    Vue.prototype.$toast = toast

    Vue.prototype.$channel = channel

    Vue.prototype.$resize = resizeImage

    Vue.prototype.$alert = MessageBox.alert

    Vue.prototype.$prompt = MessageBox.prompt
  }
})
