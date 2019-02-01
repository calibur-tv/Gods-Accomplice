<template>
  <VCommon :item="item">
    <template slot="title">
      承包视频
    </template>
    <template slot="desc">
      你承包了一个季度的番剧
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'BuyVideoPackage',
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
