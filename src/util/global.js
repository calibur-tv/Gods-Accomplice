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
const { alert, confirm, prompt } = MessageBox

M.sentry = new Sentry({ appName, appVersion })
M.invoker = new Invoker({ appName, appVersion })
M.channel = channel
M.message = {
  alert,
  confirm,
  prompt,
  toast
}

Vue.use({
  install(Vue) {
    Vue.prototype.$alias = alias

    Vue.prototype.$utils = utils

    Vue.prototype.$toast = toast

    Vue.prototype.$channel = channel

    Vue.prototype.$resize = resizeImage

    Vue.prototype.$alert = alert

    Vue.prototype.$confirm = confirm

    Vue.prototype.$prompt = prompt
  }
})
