<template>
  <div id="json-editor">
    <json-editor v-model="content"/>
  </div>
</template>

<script>
import JsonEditor from "@/components/jsonEditor/editor/index.vue";

export default {
  name: "App",
  components: {
    JsonEditor
  },
  props: {},
  data() {
    return {
      content: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
