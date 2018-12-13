<style lang="scss" module>
.btn {
  border: 1px solid #ff6881;
  color: #ff6881;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 20px;
  height: 36px;
  line-height: 34px;
  border-radius: 18px;
}
</style>

<template>
  <button :class="$style.btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'RewardBtn',
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      default: '为TA投食'
    },
    rewarded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
