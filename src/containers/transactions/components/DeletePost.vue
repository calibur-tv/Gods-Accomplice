<template>
  <VCommon :item="item">
    <template slot="title"
      >帖子被删除</template
    >
    <template slot="desc">
      <span>帖子</span>
      <a href="javascript:;" @click="$alias.post(item.model.id)">{{
        item.model.title
      }}</a>
      <span>被删除，扣除光玉</span>
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
