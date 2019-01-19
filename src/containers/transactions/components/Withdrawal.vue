<template>
  <VCommon :item="item">
    <template slot="title">
      提现
    </template>
    <template slot="desc">
      提现扣除光玉
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'Withdrawal',
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
