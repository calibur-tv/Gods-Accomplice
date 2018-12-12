import Vue from 'vue'
import toast from './toast'
import resizeImage from './resizeImage'
import utils from './func'

Vue.use({
  install(Vue) {
    Vue.prototype.$utils = utils

    Vue.prototype.$toast = toast

    Vue.prototype.$channel = new Vue()

    Vue.prototype.$resize = resizeImage
  }
})
