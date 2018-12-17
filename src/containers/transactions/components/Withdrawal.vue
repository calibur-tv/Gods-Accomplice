<template>
  <VCommon :item="item"> 提现 </VCommon>
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
