<template>
  <v-common :item="item">
    删除漫评
    <a
      href="javascript:;"
      v-text="item.about.title"
    />
  </v-common>
</template>

<script>
import VCommon from "./Common.vue";

export default {
  name: "DeleteScore",
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
