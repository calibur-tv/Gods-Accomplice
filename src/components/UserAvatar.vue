<style lang="scss">
.user-avatar {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid $color-avatar-border;

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
    @click.stop="$alias.user(user.zone)"
  >
    <img :src="$resize(user.avatar, { width: size * 2 })" />
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
      default: 40
    }
  }
}
</script>
