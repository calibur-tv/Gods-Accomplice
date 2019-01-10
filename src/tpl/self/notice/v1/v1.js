import Vue from 'vue'
import '@/style/global.scss'
import '@/util/global'
import FastClick from 'fastclick'
import app from '@/containers/notice/v1/app.vue'
import '@/util/components'

window.M = window.M || Object.create(null)

const App = Vue.extend(app)

M.app = new App().$mount('#app')
M.sentry.configureScope(scope => {
  scope.setTag('page-name', 'notice')
})

FastClick.attach(document.body)
