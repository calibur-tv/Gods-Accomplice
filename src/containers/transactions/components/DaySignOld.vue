<template>
  <VCommon :item="item"> 签到获得团子奖励（可提现） </VCommon>
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
