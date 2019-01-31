<template>
  <VCommon :item="item">
    <template slot="title">
      活跃奖励
    </template>
    <template slot="desc">
      管理员每天在站内的活跃度达到一定值，就会得到额外的光玉奖励
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'ManagerGift',
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
