<template>
  <v-common :item="item">
    邀请
    <a
      href="javascript:;"
      v-text="item.about.nickname"
    />
    注册
  </v-common>
</template>

<script>
import VCommon from "./Common.vue";

export default {
  name: "InviteUser",
  components: {
    VCommon
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  }
};
</script>
