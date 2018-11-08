<template>
  <v-common :item="item">
    签到获得团子奖励（不可提现）
  </v-common>
</template>

<script>
import VCommon from "./Common.vue";

export default {
  name: "DaySignNew",
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
