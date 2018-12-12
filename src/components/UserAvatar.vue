<style lang="scss">
.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="user-avatar"
  >
    <img :src="$resize(user.avatar, { width: size * 2 })">
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    user: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 42
    }
  }
}
</script>
