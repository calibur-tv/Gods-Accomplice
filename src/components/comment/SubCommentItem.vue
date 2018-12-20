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
    right: -20px;
    height: 1px;
    background-color: $color-line;
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
        color: $color-text-normal;
        font-weight: 500;
      }

      .to-user {
        color: $color-link;
      }
    }

    .content {
      line-height: 21px;
      color: $color-text-normal;
      font-size: 15px;
    }
  }
}
</style>

<template>
  <div :class="[$style.item, { [$style.inDetail]: inDetail }]">
    <div
      :class="$style.avatar"
      @click.stop="$alias.user(comment.from_user_zone)"
    >
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
      <div :class="$style.header" class="oneline">
        <template v-if="showToUser">
          <span
            :class="$style.nickname"
            @click.stop="$alias.user(comment.from_user_zone)"
            >{{ comment.from_user_name }}:</span
          >
          <span
            :class="$style.toUser"
            @click.stop="$alias.user(comment.to_user_zone)"
            >@{{ comment.to_user_name }}</span
          >
        </template>
        <span
          v-else
          :class="$style.nickname"
          @click.stop="$alias.user(comment.from_user_zone)"
          v-text="comment.from_user_name"
        />
      </div>
      <p
        v-if="inDetail"
        :class="$style.content"
        @click.stop="handleSubCommentClick"
        v-text="comment.content"
      />
      <p v-else :class="$style.content" v-text="comment.content" />
    </div>
  </div>
</template>

<script>
import Api from '@/api/v1/commentApi'

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
      return M.user.id
    },
    isMine() {
      return this.currentUserId === this.comment.from_user_id
    },
    showToUser() {
      return (
        this.comment.to_user_id && this.comment.to_user_id !== this.parentUserId
      )
    }
  },
  methods: {
    handleSubCommentClick() {
      let targetUserId = this.comment.from_user_id
      let targetUserName = this.comment.from_user_name
      if (this.isMine) {
        targetUserName = ''
        this.deleteComment()
        return
      }
      M.invoker.createSubComment({
        model_type: this.type,
        parent_comment_id: this.parentCommentId,
        target_user_id: targetUserId,
        target_user_name: targetUserName
      })
    },
    deleteComment() {
      if (this.deleting) {
        return
      }
      this.$confirm('删除后无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.deleting = true
          const api = new Api()
          try {
            await api.deleteSubComment({
              type: this.type,
              id: this.comment.id
            })
            this.$emit('delete', {
              id: this.comment.id
            })
          } catch (e) {
            this.$toast.error(e)
          } finally {
            this.deleting = false
          }
        })
        .catch(() => {})
    }
  }
}
</script>
