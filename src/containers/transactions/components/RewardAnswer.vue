<template>
  <VCommon :item="item">
    打赏回答 <a href="javascript:;" v-text="item.about.intro" />
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardAnswer',
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
