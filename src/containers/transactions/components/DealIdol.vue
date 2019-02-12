<template>
  <VCommon :item="item">
    <template slot="title">
      股市交易
    </template>
    <template slot="desc">
      <template v-if="item.amount > 0">
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>购买了你发布的</span>
        <a href="javascript:;" @click="$alias.role(item.model.id)">{{
          item.model.title
        }}</a>
        <span>的股份交易</span>
      </template>
      <template v-else>
        <span>你购买了</span>
        <a href="javascript:;" @click="$alias.user(item.user.zone)">{{
          item.user.nickname
        }}</a>
        <span>发布的</span>
        <a href="javascript:;" @click="$alias.post(item.model.id)">{{
          item.model.title
        }}</a>
        <span>的股份交易</span>
      </template>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'RewardPost',
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
