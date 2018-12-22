import Vue from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import UserNickname from '@/components/UserNickname.vue'
import StatsComponent from '@/components/StatsComponent.vue'
import LazyComponent from '@/components/LazyComponent.vue'
import timeago from './timeago'
import ImageLazyLoad from '@/components/ImageLazyLoad'

Vue.use(ImageLazyLoad, {})
Vue.component(timeago.name, timeago)
Vue.component(UserNickname.name, UserNickname)
Vue.component(UserAvatar.name, UserAvatar)
Vue.component(StatsComponent.name, StatsComponent)
Vue.component(LazyComponent.name, LazyComponent)
