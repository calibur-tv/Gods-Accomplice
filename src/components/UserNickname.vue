<style lang="scss">
.user-nickname {
  display: flex;
  flex-direction: row;
  align-items: center;

  .nickname {
    overflow: hidden;
    color: #484853;
    font-size: 16px;
    line-height: 22px;
  }

  .badge {
    flex-shrink: 0;
  }

  .owner-badge {
    border: 1px solid #e867ff;
    color: #e867ff;
    font-size: 12px;
    border-radius: 4px;
    background-color: rgba(#e867ff, 0.05);
    padding: 0 3px;
    margin: 0 7px;
  }
}
</style>

<template>
  <div class="user-nickname">
    <div class="nickname"><p class="oneline" v-text="user.nickname" /></div>
    <span v-if="showOwner" class="badge owner-badge"> 楼主 </span>
  </div>
</template>

<script>
export default {
  name: 'UserNickname',
  props: {
    user: {
      type: Object,
      required: true
    },
    showOwner: {
      type: Boolean,
      default: false
    }
  }
}
</script>
