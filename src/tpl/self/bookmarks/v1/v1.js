import Vue from 'vue'
import FastClick from 'fastclick'
import '@/style/global.scss'
import '@/util/prototype'
import app from '@/containers/bookmarks/v1/app.vue'
import '@/components/ImageLazyLoad'

const M = (window.M = {})

const App = Vue.extend(app)

M.app = new App().$mount('#app')

FastClick.attach(document.body)
