<style lang="scss">
.txt-item {
  .poster {
    background-color: gold;
  }
}
</style>

<template>
  <CommonItem :id="item.id" :type="item.type" class="txt-item">
    <template slot="poster">
      <i class="iconfont ic-text" />
    </template>
    <template slot="content">
      <template v-if="item.title">
        <p v-if="item.title" v-html="item.title" />
      </template>
      <template v-else>
        点击添加段落
      </template>
    </template>
  </CommonItem>
</template>

<script>
import CommonItem from './CommonItem.vue'

export default {
  name: 'TxtItem',
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
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
