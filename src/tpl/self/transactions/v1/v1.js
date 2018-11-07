import Vue from "vue";

import app from "@/containers/transactions/v1/app.vue";
import "@/style/reboot.scss";

// 初始化container
const pageData = JSON.parse(document.getElementById("page-data").textContent);

// eslint-disable-next-line no-multi-assign
const M = (window.M = {});

M.vueHub = new Vue();

const App = Vue.extend(app);

// 这里的M.app就是最大的Vue实例
M.app = new App({ data: pageData }).$mount("#app");
