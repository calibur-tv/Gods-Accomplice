import Vue from 'vue'

import app from '@/containers/transactions/v1/app.vue'
import '@/style/global.scss'
import FastClick from 'fastclick'
import '@/util/prototype'

// 初始化container
const pageData = JSON.parse(document.getElementById('page-data').textContent)

// eslint-disable-next-line no-multi-assign
const M = (window.M = {})

const App = Vue.extend(app)

// 这里的M.app就是最大的Vue实例
M.app = new App({ data: pageData }).$mount('#app')

FastClick.attach(document.body)
