import Vue from 'vue'
import app from '@/containers/notifications/v1/app.vue'
import '@/style/global.scss'
import '@/util/global'
import '@/util/components'
import FastClick from 'fastclick'

window.M = window.M || Object.create(null)

const App = Vue.extend(app)

// 这里的M.app就是最大的Vue实例
M.app = new App().$mount('#app')

FastClick.attach(document.body)
