<style lang="scss">
.user-panel {
  @extend %clearfix;
  margin-bottom: 20px;

  .user-avatar {
    float: left;
    margin-right: 10px;
  }

  button {
    float: right;
    margin-left: 10px;
    margin-top: 6px;
  }

  .user-info {
    height: 40px;
    overflow: hidden;

    .user-nickname {
      margin-top: 2px;
      margin-bottom: 1px;
    }

    time {
      color: $color-text-light;
      @include half-font(10px, top);
      line-height: 28px;
    }
  }
}
</style>

<template>
  <div class="user-panel">
    <UserAvatar :user="user" />
    <UserFollowBtn :user-id="user.id" :followed="isFollowed" />
    <div class="user-info">
      <UserNickname :user="user" />
      <VTime v-model="time" />
    </div>
  </div>
</template>

<script>
import UserFollowBtn from '@/components/UserFollowBtn'

export default {
  name: 'FlowHeaderUser',
  components: {
    UserFollowBtn
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    isFollowed: {
      type: Boolean,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  }
}
</script>
