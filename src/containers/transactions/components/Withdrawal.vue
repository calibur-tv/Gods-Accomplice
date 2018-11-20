<template>
  <v-common :item="item">
    提现
  </v-common>
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
