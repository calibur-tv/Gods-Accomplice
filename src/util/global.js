import Vue from 'vue'
import toast from './toast'
import resizeImage from './resizeImage'
import utils from './func'
import Sentry from './sentry'
import Invoker from '@/invoker/index'
import alias from './alias'

window.M = window.M || Object.create(null)

const appVersion = document.querySelector('meta[name=app-version]').content
const appName = document.querySelector('meta[name=app-name]').content
const channel = new Vue()

M.sentry = new Sentry({ appName, appVersion })
M.invoker = new Invoker({ appName, appVersion })
M.channel = channel

Vue.use({
  install(Vue) {
    Vue.prototype.$alias = alias

    Vue.prototype.$utils = utils

    Vue.prototype.$toast = toast

    Vue.prototype.$channel = channel

    Vue.prototype.$resize = resizeImage
  }
})
