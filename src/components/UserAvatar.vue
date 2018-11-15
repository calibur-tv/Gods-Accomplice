<style lang="scss">
.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 21px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="user-avatar">
    <img :src="$resize(user.avatar, { width: 84 })">
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>
