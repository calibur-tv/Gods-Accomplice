<template>
  <VCommon :item="item">
    <template slot="title">
      投食漫评
    </template>
    <template slot="desc">
      <template v-if="item.amount > 0">
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>投食了你的漫评</span>
        <a href="javascript:;" @click="$alias.review(item.model.id)">{{
          item.model.title
        }}</a>
      </template>
      <template v-else>
        <span>你投食了</span>
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>的漫评</span>
        <a href="javascript:;" @click="$alias.review(item.model.id)">{{
          item.model.title
        }}</a>
      </template>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardScore',
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
