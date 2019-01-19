<template>
  <VCommon :item="item">
    <template slot="title"
      >删除原创内容</template
    >
    <template slot="desc">
      原创内容被删除，会扣除相应投食数的光玉
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'DeletePost',
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
