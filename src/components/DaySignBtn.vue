<style lang="scss" module>
.btn {
  width: 78px;
  height: 36px;
  border-radius: 18px;
  background-color: #ff6881;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
}
</style>

<template>
  <button :class="$style.btn">{{ signed ? '已签到' : '签到' }}</button>
</template>

<script>
export default {
  name: 'DaySignBtn',
  props: {
    signed: {
      type: Boolean,
      default: false
    }
  }
}
</script>
