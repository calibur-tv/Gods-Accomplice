<template>
  <VCommon :item="item">
    <template slot="title">
      投食视频
    </template>
    <template slot="desc">
      <template v-if="item.amount">
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>投食了你的视频</span>
        <a href="javascript:;" @click="$alias.video(item.model.id)">{{
          item.model.title
        }}</a>
      </template>
      <template v-else>
        <span>你投食了</span>
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>的视频</span>
        <a href="javascript:;" @click="$alias.video(item.model.id)">{{
          item.model.title
        }}</a>
      </template>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardVideo',
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
