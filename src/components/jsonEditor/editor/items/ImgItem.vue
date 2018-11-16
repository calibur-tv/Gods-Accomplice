<style lang="scss">
.img-item {
  .poster {
    background-color: #67c23a;
  }
}
</style>

<template>
  <common-item
    class="img-item"
    @delete="emitDelete"
  >
    <template slot="poster">
      <v-img
        v-if="item.url"
        :src="item.url"
        :size="76"
      />
      <i
        v-else
        class="iconfont ic-image"
      />
    </template>
    <template slot="content">
      <template v-if="item.text">
        {{ item.text }}
      </template>
      <template v-else>
        点击添加图片描述
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
