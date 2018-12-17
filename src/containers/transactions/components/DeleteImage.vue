<template>
  <VCommon :item="item">
    删除图片 <a href="javascript:;" v-text="item.about.title" />
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'DeleteImage',
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
