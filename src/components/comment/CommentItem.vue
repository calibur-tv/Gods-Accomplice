<style lang="scss">
.comment-item {
  position: relative;
  margin-top: $container-padding;

  &:after {
    content: '';
    position: absolute;
    left: -$container-padding;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #e5e5e5;
    transform: scaleY(0.5);
  }

  &.in-detail {
    .content .header {
      align-items: center;
    }
  }

  .avatar {
    margin-right: 10px;
    float: left;
  }

  .content {
    overflow: hidden;
    padding-right: $container-padding;

    .header {
      margin-bottom: 3px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;

      .user-nickname {
        .oneline {
          font-size: 16px;
          line-height: 22px;
          font-weight: 500;
          color: #22222b;
        }
      }

      .right-btn {
        .tool-btn-wrap {
          display: block;
          position: relative;
          width: 20px;
          height: 20px;

          button {
            position: absolute;
            left: -10px;
            top: -10px;
            width: 40px;
            height: 40px;
          }

          img {
            width: 20px;
            height: 20px;
          }
        }

        .user-follow-button {
          font-size: 12px;
          height: 20px;
          line-height: 18px;
          border-radius: 10px;
          padding-left: 12px;
          padding-right: 12px;
        }
      }
    }

    .main {
      font-size: 15px;
      color: #22222b;
      line-height: 21px;
      min-height: 65px;

      .image-area {
        margin: 10px 0;
      }
    }

    .footer {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #a4a4ae;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .social {
        position: relative;
        width: 20px;
        height: 20px;

        button {
          display: block;
          height: 40px;
          width: 80px;
          position: absolute;
          left: -50px;
          top: -10px;
          padding: 10px;
          text-align: right;

          &.is-active {
            color: #ff6881;
          }
        }

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .comment-tool {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;

    .panel {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 120px;
      background-color: #fff;
      border-radius: 5px;
      transform: translate(-50%, -50%);

      div {
        text-align: center;
        position: relative;
        font-size: 13px;
        height: 40px;
        line-height: 40px;
        color: #484853;

        &:not(:first-child) {
          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            background-color: #e5e5e5;
            transform: scaleY(0.5);
          }
        }
      }
    }
  }
}
</style>

<template>
  <div
    :id="`comment-${comment.id}`"
    :class="{ 'in-detail': inDetail }"
    class="comment-item"
    @click.stop="toDetailPage"
  >
    <div class="avatar"><UserAvatar :size="35" :user="computeFromUser" /></div>
    <div class="content">
      <div class="header">
        <UserNickname :user="computeFromUser" />
        <div class="right-btn">
          <UserFollowBtn
            v-if="inDetail"
            :user-id="computeFromUser.id"
            :followed="false"
            class="user-follow-button"
          />
          <div v-else class="tool-btn-wrap">
            <button @click.stop="showCommentTool = true">
              <img src="./images/dots.png" />
            </button>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="text-area" v-html="comment.content" />
        <div v-if="comment.images.length" class="image-area">
          <VImg
            v-for="(item, index) in comment.images"
            :key="index"
            :src="item.url"
            :size="item.size"
            :type="item.type"
            :width="item.width"
            :height="item.height"
            :full="true"
            :blur="true"
            @click="handleImagePreview(index)"
          />
        </div>
      </div>
      <slot name="extra" />
      <div class="footer">
        <div class="info">
          <span>{{ comment.floor_count - 1 }}楼</span>
          <VTime v-model="comment.created_at" />
        </div>
        <div class="social">
          <button
            :class="{ 'is-active': comment.liked }"
            @click.stop="toggleLike"
          >
            <span v-if="comment.like_count">{{
              $utils.shortenNumber(comment.like_count)
            }}</span>
            <img v-if="comment.liked" src="./images/like-active.png" />
            <img v-else src="./images/like.png" />
          </button>
        </div>
      </div>
      <SubCommentList v-if="!inDetail" :parent-comment="comment" :type="type" />
    </div>
    <div
      v-if="showCommentTool"
      class="comment-tool"
      @click.stop="showCommentTool = false"
    >
      <div class="panel">
        <div>举报</div>
        <div v-if="canDelete" @click="deleteComment">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import SubCommentList from './SubCommentList'
import UserFollowBtn from '@/components/UserFollowBtn'
import Api from '@/api/v1/commentApi'

// TODO：删除主评论和举报主评论
export default {
  name: 'CommentCommentItem',
  components: {
    SubCommentList,
    UserFollowBtn
  },
  props: {
    comment: {
      required: true,
      type: Object
    },
    masterId: {
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
      deleting: false,
      liking: false,
      showCommentTool: false
    }
  },
  computed: {
    currentUserId() {
      return M.user.id
    },
    computeFromUser() {
      return {
        id: this.comment.from_user_id,
        avatar: this.comment.from_user_avatar,
        nickname: this.comment.from_user_name,
        zone: this.comment.from_user_zone
      }
    },
    isMaster() {
      return this.currentUserId === this.masterId
    },
    isMine() {
      return this.currentUserId === this.comment.from_user_id
    },
    canDelete() {
      return this.isMine || this.isMaster
    }
  },
  methods: {
    async toggleLike() {
      if (this.liking) {
        return
      }
      this.liking = true
      try {
        const result = !this.comment.liked
        this.comment.liked = result
        this.comment.like_count += result ? 1 : -1
        const api = new Api()
        await api.toggleLikeMainComment({
          type: this.type,
          id: this.comment.id
        })
      } finally {
        this.liking = false
      }
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
            await api.deleteMainComment({
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
    },
    handleImagePreview(index) {
      M.invoker.previewImages({
        index,
        images: this.comment.images
      })
    },
    toDetailPage() {
      if (this.inDetail) {
        return
      }
      this.$alias.comment({
        model: this.type,
        comment_id: this.comment.id
      })
    }
  }
}
</script>
