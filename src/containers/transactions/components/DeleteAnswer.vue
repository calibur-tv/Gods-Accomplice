<template>
  <VCommon :item="item">
    删除答案 <a href="javascript:;" v-text="item.about.intro" />
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'DeleteAnswer',
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
