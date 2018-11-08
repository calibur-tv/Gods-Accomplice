import Vue from "vue";
import toast from "./toast";
import resizeImage from "./resizeImage";

Vue.use({
  install(Vue) {
    Vue.prototype.$toast = toast;

    Vue.prototype.$channel = new Vue();

    Vue.prototype.$resize = resizeImage;
  }
});
