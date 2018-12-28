<style lang="scss" module>
.tag {
  position: relative;
  height: 25px;
  line-height: 25px;
  background-color: $color-background-tag;
  padding: 0 10px;
  margin-right: 10px;
  border-radius: 0 4px 0 4px;
  font-size: 0;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    right: -4px;
    width: 0;
    height: 0;
    border: 5px solid;
    border-color: transparent;
    border-bottom-color: $color-background-tag;
  }

  img {
    width: 15px;
    height: 15px;
    margin-right: 2px;
    margin-left: -2px;
  }

  span {
    display: inline-block;
    color: #484853;
    font-size: 13px;
  }
}
</style>

<template>
  <button :class="$style.tag" @click="$emit('click')">
    <slot name="icon" /> <span v-text="text" />
  </button>
</template>

<script>
export default {
  name: 'BubbleTag',
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
