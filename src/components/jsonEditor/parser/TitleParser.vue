<style lang="scss">
.json-content-txt-parser {
  h3 {
    margin-left: $container-padding;
    margin-right: $container-padding;
    line-height: 1.7;
    color: $color-text-normal;
    font-weight: bold;
    margin-top: 1.66667em;
    margin-bottom: 0.83333em;
    font-size: 18px;
    @extend %breakWord;
  }
}
</style>

<template>
  <div class="json-content-txt-parser">
    <h3
      v-if="item.text"
      v-text="item.text"
    />
  </div>
</template>

<script>
  export default {
    name: 'JsonContentTitleParser',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
