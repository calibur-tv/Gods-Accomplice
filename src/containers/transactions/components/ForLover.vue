<template>
  <v-common :item="item">
    为
    <a
      href="javascript:;"
      v-text="item.about.name"
    />
    应援
  </v-common>
</template>

<script>
import VCommon from "./Common.vue";

export default {
  name: "ForLover",
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
