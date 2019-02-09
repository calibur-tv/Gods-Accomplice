<template>
  <VCommon :item="item">
    <template slot="title"
      >答案被删除</template
    >
    <template slot="desc">
      <span> 你在问题《{{ item.model.title }}》下的回答被删除，扣除光玉 </span>
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
