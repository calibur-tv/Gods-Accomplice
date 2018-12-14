import Vue from 'vue'
import toast from './toast'
import resizeImage from './resizeImage'
import utils from './func'
import Sentry from './sentry'
import Invoker from '@/invoker/index'

window.M = window.M || Object.create(null)

const appVersion = document.querySelector('meta[name=app-version]').content
const appName = document.querySelector('meta[name=app-name]').content

M.sentry = new Sentry({ appName, appVersion })
M.invoker = new Invoker({ appName, appVersion })

Vue.use({
  install(Vue) {
    Vue.prototype.$utils = utils

    Vue.prototype.$toast = toast

    Vue.prototype.$channel = new Vue()

    Vue.prototype.$resize = resizeImage
  }
})
