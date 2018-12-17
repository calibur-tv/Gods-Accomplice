<template>
  <VCommon :item="item">
    打赏漫评 <a href="javascript:;" v-text="item.about.title" />
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardScore',
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
