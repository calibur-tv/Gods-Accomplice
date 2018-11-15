<template>
  <v-common :item="item">
    {{ item.about.title }}
  </v-common>
</template>

<script>
import VCommon from "./Common.vue";

export default {
  name: "ActivityGift",
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
