import Vue from "vue";

import app from "@/containers/notifications/v1/app.vue";
import "@/style/global.scss";
import FastClick from "fastclick";
import "@/util/prototype";
import "@/util/components";

// eslint-disable-next-line no-multi-assign
const M = (window.M = {});

const App = Vue.extend(app);

// 这里的M.app就是最大的Vue实例
M.app = new App().$mount("#app");

FastClick.attach(document.body);
