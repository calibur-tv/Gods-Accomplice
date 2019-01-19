<template>
  <VCommon :item="item">
    <template slot="title">
      活跃奖励
    </template>
    <template slot="desc">
      每天在站内的活跃度达到一定值，就会得到团子奖励
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'ActivityGift',
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
