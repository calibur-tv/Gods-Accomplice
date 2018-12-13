<style lang="scss" module>
.tag {
  position: relative;
  height: 25px;
  line-height: 25px;
  background-color: #f6f7f7;
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
    border-bottom-color: #f6f7f7;
  }

  i {
    display: inline-block;
    margin-right: 5px;
    margin-left: -3px;
    font-size: 13px;
    color: #ff6881;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    color: #484853;
    font-size: 13px;
    vertical-align: middle;
  }
}
</style>


<template>
  <button :class="$style.tag">
    <i
      v-if="icon"
      :class="`ic-${icon}`"
      class="iconfont"
    />
    <span v-text="text"/>
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
