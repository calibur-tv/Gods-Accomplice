<template>
  <v-common :item="item">
    打赏漫评
    <a
      href="javascript:;"
      v-text="item.about.title"
    />
  </v-common>
</template>

<script>
import VCommon from "./Common.vue";

export default {
  name: "RewardScore",
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
