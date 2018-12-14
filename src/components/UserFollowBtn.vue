<style lang="scss" module>
.btn {
  background-color: #ff6881;
  border: 1px solid #ff6881;
  color: #fff;
  font-size: 13px;
  height: 28px;
  line-height: 26px;
  border-radius: 14px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;

  &.followed {
    color: #ff6881;
    background-color: transparent;
  }
}
</style>

<template>
  <button
    :class="[$style.btn, { [$style.followed]: followed }]"
    @click="handleClick"
  >
    {{ followed ? '已关注' : '关注' }}
  </button>
</template>

<script>
export default {
  name: 'UserFollowBtn',
  props: {
    userId: {
      type: Number,
      required: true
    },
    followed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      M.invoker.getDeviceInfo(data => {
        alert(JSON.stringify(data))
      })
    }
  }
}
</script>
