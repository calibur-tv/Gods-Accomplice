<style lang="scss">
.json-content-img-parser {
  margin-bottom: 25px;
  text-align: center;

  .img-tip {
    min-width: 20%;
    max-width: 80%;
    min-height: 22px;
    padding: 10px 10px 6px;
    border-bottom: 1px solid #d9d9d9;
    font-size: 14px;
    color: #969696;
    line-height: 1.7;
    text-align: center;
    display: inline-block;
    @extend %breakWord;
  }
}
</style>

<template>
  <div class="json-content-img-parser">
    <span @click="emitImagePreview">
      <VImg
        :src="item.url"
        :width="item.width"
        :height="item.height"
        :mime="item.mime"
        :blur="true"
        :full="true"
      />
    </span>
    <p v-if="item.text" class="img-tip" v-text="item.text" />
  </div>
</template>

<script>
export default {
  name: 'JsonContentImgParser',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitImagePreview() {
      this.$channel.$emit('json-editor-image-click', this.item)
    }
  }
}
</script>
