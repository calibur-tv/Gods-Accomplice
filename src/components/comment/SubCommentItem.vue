<style lang="scss" module>
.item {
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;

  &.in-detail {
    &:first-child {
      &:before {
        content: none;
      }
    }
    &:before {
      left: -$container-padding;
    }

    .avatar {
      margin-right: 10px;
    }

    .main .header {
      margin-bottom: 3px;
    }
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: -$container-padding;
    height: 1px;
    background-color: #e5e5e5;
    transform: scaleY(0.5);
  }

  .avatar {
    float: left;
    margin-right: 8px;
  }

  .main {
    overflow: hidden;

    .header {
      font-size: 16px;
      margin-bottom: 7px;

      span {
        line-height: 15px;
        display: inline-block;
        vertical-align: top;
      }

      .nickname {
        color: #22222b;
        font-weight: 500;
      }

      .to-user {
        color: #49689b;
      }
    }

    .content {
      line-height: 21px;
      color: #22222b;
      font-size: 15px;
    }
  }
}
</style>

<template>
  <div :class="[$style.item, { [$style.inDetail]: inDetail }]">
    <div :class="$style.avatar">
      <VImg
        v-if="inDetail"
        :src="comment.from_user_avatar"
        :width="35"
        :height="35"
        :avatar="true"
      />
      <VImg
        v-else
        :src="comment.from_user_avatar"
        :width="22"
        :height="22"
        :avatar="true"
      />
    </div>
    <div :class="$style.main">
      <div :class="$style.header">
        <template v-if="comment.to_user_zone">
          <span :class="$style.nickname">{{ comment.from_user_name }}:</span>
          <span :class="$style.toUser">@{{ comment.to_user_name }}</span>
        </template>
        <span v-else :class="$style.nickname" v-text="comment.from_user_name" />
      </div>
      <p
        :class="$style.content"
        v-text="comment.context"
        @click="handleSubCommentClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubCommentItem',
  props: {
    comment: {
      required: true,
      type: Object
    },
    parentUserId: {
      required: true,
      type: Number
    },
    parentCommentId: {
      required: true,
      type: Number
    },
    type: {
      required: true,
      type: String
    },
    inDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deleting: false
    }
  },
  computed: {
    currentUserId() {
      return 0
    },
    isMine() {
      return this.currentUserId === this.comment.from_user_id
    },
    canDelete() {
      return this.isMine || this.currentUserId === this.parentUserId
    }
  },
  methods: {
    handleSubCommentClick() {
      if (this.isMine) {
        this.deleteComment()
        this.$nextTick(() => {
          document.getElementById('reply-comment-textarea').style.display =
            'none'
        })
        return
      }
      if (this.currentUserId) {
        this.$channel.$emit('reply-comment', {
          id: this.parentCommentId,
          targetUserId: this.comment.from_user_id,
          targetUserName: this.comment.from_user_name
        })
      }
    },
    deleteComment() {
      if (!this.canDelete) {
        return
      }
      if (this.deleting) {
        return
      }
      this.deleting = true
      this.$confirm('删除后无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('comment/deleteSubComment', {
            ctx: this,
            type: this.type,
            id: this.comment.id,
            parentId: this.comment.parent_id
          })
        })
        .catch(e => {
          this.deleting = false
          if (e === 'cancel') {
            return
          }
          this.$toast.error(e)
        })
    }
  }
}
</script>
