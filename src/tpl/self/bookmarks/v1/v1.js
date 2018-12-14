import Vue from 'vue'
import '@/style/global.scss'
import '@/util/global'
import FastClick from 'fastclick'
import ImageLazyLoad from '@/components/ImageLazyLoad'
import app from '@/containers/bookmarks/v1/app.vue'

Vue.use(ImageLazyLoad, {})
window.M = window.M || Object.create(null)

const App = Vue.extend(app)

M.app = new App().$mount('#app')

FastClick.attach(document.body)
