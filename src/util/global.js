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
console.log(appVersion)
console.log(appName)
M.sentry = new Sentry({ appName, appVersion })
M.invoker = new Invoker({ appName, appVersion })
M.channel = channel

const container = document.body
const el = document.createElement('div')
el.innerHTML =
  container.children.length +
  ':<br/>' +
  'name：' +
  appName +
  'version：' +
  appVersion + 'inviker' + JSON.stringify(M.invoker.jsFuncs)
container.insertBefore(el, container.children[0])

Vue.use({
  install(Vue) {
    Vue.prototype.$alias = alias

    Vue.prototype.$utils = utils

    Vue.prototype.$toast = toast

    Vue.prototype.$channel = channel

    Vue.prototype.$resize = resizeImage
  }
})
