import Vue from "vue";
import toast from "@/util/toast";

Vue.use({
  install(Vue) {
    Vue.prototype.$toast = toast;

    Vue.$channel = new Vue();
  }
});
