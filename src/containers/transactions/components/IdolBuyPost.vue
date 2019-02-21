<template>
  <VCommon :item="item">
    <template slot="title">
      股市采购
    </template>
    <template slot="desc">
      <a href="javascript:;" @click="$alias.role(item.model.id)">{{
        item.model.title
      }}</a>
      <span>的经纪人</span>
      <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
        item.user.nickname
      }}</a>
      <span>在股市采购了你的帖子</span>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'IdolBuyPost',
  components: {
    VCommon
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  }
}
</script>
