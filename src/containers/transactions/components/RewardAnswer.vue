<template>
  <VCommon :item="item">
    <template slot="title">
      投食回答
    </template>
    <template slot="desc">
      <template v-if="item.add">
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>投食了你在问题</span>
        <a href="javascript:;">{{ item.model.title }}</a> <span>下的回答</span>
      </template>
      <template v-else>
        <span>你投食了</span>
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>在问题</span> <a href="javascript:;">{{ item.model.title }}</a>
        <span>下的回答</span>
      </template>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardAnswer',
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
