<template>
  <VCommon :item="item">
    <template slot="title">
      偶像应援
    </template>
    <template slot="desc">
      为<a href="javascript:;" @click="$alias.role(item.model.id)">{{
        item.model.title
      }}</a
      >应援
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
