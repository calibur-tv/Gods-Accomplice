<template>
  <VCommon :item="item">
    <template slot="title">
      偶像赞助
    </template>
    <template slot="desc">
      <span>你通过向帖子：</span>
      <a href="javascript:;" @click="$alias.post(item.model.id)">{{
        item.model.title
      }}</a>
      <span>投食，赞助了偶像</span>
      <a href="javascript:;" @click="$alias.idol(item.user.id)">{{
        item.user.name
      }}</a>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'IdolBuyPost',
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
