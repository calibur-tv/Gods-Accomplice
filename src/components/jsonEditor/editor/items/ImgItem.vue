<style lang="scss">
.img-item {
  .poster {
    background-color: #67c23a;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <CommonItem :id="item.id" :type="item.type" class="img-item">
    <template slot="poster">
      <img v-if="item.url" :src="$resize(item.url, { width: 152 })" />
      <i v-else class="iconfont ic-image" />
    </template>
    <template slot="content">
      <template v-if="item.text">
        {{ item.text }}
      </template>
      <template v-else>
        点击添加图片描述
      </template>
    </template>
  </CommonItem>
</template>

<script>
import CommonItem from './CommonItem.vue'

export default {
  name: 'ImgItem',
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
