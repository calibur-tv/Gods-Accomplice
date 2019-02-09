<template>
  <VCommon :item="item">
    <template slot="title">
      视频被承包
    </template>
    <template slot="desc">
      你的视频被人承包了
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
