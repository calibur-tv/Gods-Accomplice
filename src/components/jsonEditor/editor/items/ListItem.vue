<style lang="scss">
.list-item {
  .poster {
    background-color: #00a1d6;
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  ul,
  ol {
    margin-left: 1.3em;
  }

  span {
    display: block;
  }
}
</style>

<template>
  <common-item
    class="list-item"
    @delete="emitDelete"
  >
    <template slot="poster">
      <i class="iconfont ic-list"/>
    </template>
    <template slot="content">
      <template v-if="item.text">
        <ol v-if="item.sort === '1'">
          <li
            v-for="(li, index) in computeList(item.text)"
            :key="index"
          >
            <span
              class="oneline"
              v-text="li"
            />
          </li>
        </ol>
        <ul v-else>
          <li
            v-for="(li, index) in computeList(item.text)"
            :key="index"
          >
            <span
              class="oneline"
              v-text="li"
            />
          </li>
        </ul>
      </template>
      <template v-else>
        点击添加列表内容
      </template>
    </template>
  </common-item>
</template>

<script>
import CommonItem from "./CommonItem.vue";

export default {
  name: "ListItem",
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
    computeList(text) {
      let list = text;
      while (/\n\n/.test(list)) {
        list = list.replace(/\n\n/g, "\n");
      }
      return list.split("\n").slice(0, 4);
    },
    emitDelete() {
      this.$emit("delete", {
        id: this.item.id
      });
    }
  }
};
</script>
