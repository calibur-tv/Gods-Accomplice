<template>
  <VCommon :item="item">
    <template slot="title">
      投食相册
    </template>
    <template slot="desc">
      <template v-if="item.add">
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>投食了你的相册</span>
        <a href="javascript:;" @click="$alias.post(item.model.id)">{{
          item.model.title
        }}</a>
      </template>
      <template v-else>
        <span>你投食了</span>
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>的相册</span>
        <a href="javascript:;" @click="$alias.post(item.model.id)">{{
          item.model.title
        }}</a>
      </template>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardImage',
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
