<template>
  <VCommon :item="item">
    <template slot="title">
      邀请注册
    </template>
    <template slot="desc">
      <span>你是被</span>
      <a
        href="javascript:;"
        @click="$alias.user(item.user.zone)"
        v-text="item.user.nickname"
      />
      <span>邀请而来，送你一枚团子</span>
    </template>
  </VCommon>
</template>

<script>
import VCommon from './Common.vue'

export default {
  name: 'InviteUser',
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
