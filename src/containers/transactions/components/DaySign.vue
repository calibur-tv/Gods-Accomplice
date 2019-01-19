<template>
  <VCommon :item="item">
    <template slot="title">
      每日签到
    </template>
    <template slot="desc">
      签到获得团子奖励
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'DaySignOld',
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
