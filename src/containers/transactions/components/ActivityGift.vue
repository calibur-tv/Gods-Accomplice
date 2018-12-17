<template>
  <VCommon :item="item"> {{ item.about.title }} </VCommon>
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
