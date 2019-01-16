<style lang="scss">
.title-item {
  .poster {
    background-color: #9266f9;
  }
}
</style>

<template>
  <CommonItem :id="item.id" :type="item.type" class="title-item">
    <template slot="poster">
      <i class="iconfont ic-text" />
    </template>
    <template slot="content">
      <template v-if="item.text">
        <p v-html="item.text" />
      </template>
      <template v-else>
        点击添加标题
      </template>
    </template>
  </CommonItem>
</template>

<script>
import CommonItem from './CommonItem.vue'

export default {
  name: 'TitleItem',
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
