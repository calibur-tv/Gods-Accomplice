<style lang="scss">
.create-btn {
  text-align: center;
  opacity: 1;
}
</style>

<template>
  <div class="create-btn">
    <v-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <button slot="reference">+</button>
    </v-popover>
  </div>
</template>

<script>
import { Popover } from "element-ui";

export default {
  name: "CreateBtn",
  components: {
    VPopover: Popover
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
