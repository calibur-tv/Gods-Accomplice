<template>
  <VCommon :item="item">
    <template slot="title">
      奖励团子
    </template>
    <template slot="desc">
      由于你触发了特殊剧情，获得系统为你奖励的团子
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'SystemGift',
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
