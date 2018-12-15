import Vue from 'vue'
import '@/style/global.scss'
import '@/util/global'
import FastClick from 'fastclick'
import app from '@/containers/home/v1/app.vue'

// 初始化container
const pageData = JSON.parse(document.getElementById('page-data').textContent)

// eslint-disable-next-line no-multi-assign
window.M = window.M || Object.create(null)

const App = Vue.extend(app)

// 这里的M.app就是最大的Vue实例
M.app = new App({ data: pageData }).$mount('#app')

FastClick.attach(document.body)