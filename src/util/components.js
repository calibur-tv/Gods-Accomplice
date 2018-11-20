import Vue from 'vue'
import VueTimeago from 'vue-timeago'
import UserAvatar from '@/components/UserAvatar.vue'
import UserNickname from '@/components/UserNickname.vue'

Vue.use(VueTimeago, {
  name: 'VTime',
  locale: 'zh-CN', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn')
  }
})
Vue.component(UserNickname.name, UserNickname)
Vue.component(UserAvatar.name, UserAvatar)
