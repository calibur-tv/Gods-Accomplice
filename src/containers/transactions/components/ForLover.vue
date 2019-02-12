<template>
  <VCommon :item="item">
    <template slot="title">
      偶像入股
    </template>
    <template slot="desc">
      <span>入股</span>
      <a href="javascript:;" @click="$alias.role(item.model.id)">{{
        item.model.title
      }}</a>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'ForLover',
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
