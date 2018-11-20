import Vue from 'vue'
import { MessageBox } from 'mint-ui'
import '@/style/alert.scss'

Vue.use({
  install(Vue) {
    Vue.prototype.$alert = MessageBox.alert

    Vue.prototype.$confirm = MessageBox.confirm

    Vue.prototype.$prompt = MessageBox.prompt
  }
})
