import Vue from 'vue'
import app from '@/containers/comment/v1/app.vue'
import '@/style/global.scss'
import '@/util/global'
import '@/util/components'
import FastClick from 'fastclick'

// 初始化container
let pageData
try {
  pageData = JSON.parse(document.getElementById('page-data').textContent)
} catch (e) {
  M.sentry.configureScope(scope => {
    scope.setTag('error-type', 'page-data')
  })
  M.sentry.captureException(e)
  pageData = {}
}
// eslint-disable-next-line no-multi-assign
window.M = window.M || Object.create(null)

const App = Vue.extend(app)

// 这里的M.app就是最大的Vue实例
M.app = new App({ data: pageData }).$mount('#app')
M.sentry.configureScope(scope => {
  scope.setTag('page-name', 'comment')
})

FastClick.attach(document.body)
