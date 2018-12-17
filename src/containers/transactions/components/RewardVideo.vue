<template>
  <VCommon :item="item">
    打赏视频 <a href="javascript:;" v-text="item.about.title" />
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardVideo',
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
