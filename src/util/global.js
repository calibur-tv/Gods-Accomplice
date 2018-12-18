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

const container = document.body
const el = document.createElement('div')
el.innerHTML =
  '<p>' +
  'name：' +
  appName +
  '，version：' +
  appVersion +
  '，token：' +
  (document.querySelector('meta[name=jwt-token]').content || 'zI1NiJ9.eyJyZW1lbWJlciI6IjI4ZGUzZWQ3ZmUyNjgzMTAzZTg5NGI1YTBiOGMwNjFjIiwic3ViIjoyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwOTkvZG9vci9sb2dpbiIsImlhdCI6MTU0NDUyODEzOSwiZXhwIjoxNTQ2OTQ3MzM5LCJuYmYiOjE1NDQ1MjgxMzksImp0aSI6IklKNG1TSHAxa3dJc0VWWXYifQ.1wPpubQb9BadZ_6ITbULnjIYmETmsbErzHzcFkyjtMU')
  + '</p>'
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
