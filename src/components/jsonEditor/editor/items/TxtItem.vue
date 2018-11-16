<style lang="scss">
.txt-item {
  .poster {
    background-color: gold;
  }
}
</style>

<template>
  <common-item
    class="txt-item"
    @delete="emitDelete"
  >
    <template slot="poster">
      <i class="iconfont ic-text"/>
    </template>
    <template slot="content">
      <!-- title 和 text 之后要分开 -->
      <template v-if="item.text || item.title">
        <p
          v-if="item.text && !item.title"
          v-html="item.text"
        />
        <h3
          v-else-if="item.title && !item.text"
          v-text="item.title"
        />
        <template v-else>
          <h3
            class="oneline"
            v-html="item.title"
          />
          <p
            class="three-line"
            v-html="item.text"
          />
        </template>
      </template>
      <template v-else>
        点击添加文字
      </template>
    </template>
  </common-item>
</template>

<script>
import CommonItem from "./CommonItem.vue";

export default {
  name: "ImgItem",
  components: {
    CommonItem
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    emitDelete() {
      this.$emit("delete", {
        id: this.item.id
      });
    }
  }
};
</script>
