<template>
  <VCommon :item="item">
    <template slot="title"
      >账号违规</template
    >
    <template slot="desc">
      由于当前账号违反了社区规范，所拥有的团子和光玉被冻结
    </template>
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
