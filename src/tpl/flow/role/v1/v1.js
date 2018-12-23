import Vue from 'vue'
import app from '@/containers/role/v1/app.vue'
import '@/style/global.scss'
import '@/util/global'
import '@/util/components'
import FastClick from 'fastclick'

// 初始化container
const pageData = JSON.parse(document.getElementById('page-data').textContent)

window.M = window.M || Object.create(null)

const App = Vue.extend(app)

// 这里的M.app就是最大的Vue实例
M.app = new App({ data: pageData }).$mount('#app')

FastClick.attach(document.body)