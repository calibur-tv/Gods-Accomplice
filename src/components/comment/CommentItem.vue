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
    background-color: $color-line;
    transform: scaleY(0.5);
  }

  .avatar {
    margin-right: 10px;
    float: left;
  }

  .content {
    overflow: hidden;
    padding-right: 20px;

    .header {
      margin-bottom: 5px;

      .user-nickname {
        overflow: hidden;

        .oneline {
          font-size: 16px;
          line-height: 20px;
          font-weight: 500;
          color: $color-text-gray;
        }
      }

      .right-btn {
        float: right;
        margin-left: 15px;

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
      color: $color-text-normal;
      line-height: 21px;
      min-height: 65px;

      .image-area {
        margin: 10px 0;
        position: relative;

        .image {
          border-radius: 2px;

          &:not(:nth-child(3n)) {
            margin-right: 2%;
          }

          &:nth-child(n + 4) {
            margin-top: 2%;
          }
        }

        .mask {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 32%;
          border-radius: 2px;
          background-color: rgba(#2f2f2f, 0.6);
          overflow: hidden;
          pointer-events: none;

          span {
            font-size: 15px;
            color: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            text-align: center;
          }
        }
      }
    }

    .footer {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      color: $color-text-light;
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
            color: $color-red;
          }
        }

        img {
          width: 20px;
          height: 20px;
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
        <div class="right-btn">
          <UserFollowBtn
            v-if="inDetail"
            :user-id="computeFromUser.id"
            :followed="false"
            class="user-follow-button"
          />
          <div v-else-if="canDelete" class="tool-btn-wrap">
            <button @click.stop="deleteComment">
              <img src="./images/dots.png" />
            </button>
          </div>
        </div>
        <UserNickname :user="computeFromUser" :is-master="isMaster" />
      </div>
      <div class="main">
        <div class="text-area" v-html="comment.content" />
        <div v-if="imageCount" class="image-area">
          <div v-if="imageCount === 1">
            <VImg
              v-for="(item, index) in comment.images"
              :key="index"
              :src="item.url"
              :size="item.size"
              :type="item.type"
              :blur="true"
              :height="98"
              width="auto"
              class="image"
              @click="handleImagePreview(index)"
            />
          </div>
          <div v-else>
            <div>
              <VImg
                v-for="(item, index) in filterImages"
                :key="index"
                :src="item.url"
                :size="item.size"
                :type="item.type"
                :blur="true"
                width="32%"
                class="image"
                @click="handleImagePreview(index)"
              />
            </div>
            <div v-if="imageCount > 3 && !inDetail" class="mask">
              <span>共{{ imageCount }}张图片</span>
            </div>
          </div>
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
      liking: false
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
      return this.isMine || this.isMaster || M.user.is_admin
    },
    imageCount() {
      return this.comment.images.length
    },
    filterImages() {
      return this.inDetail
        ? this.comment.images
        : this.comment.images.slice(0, 3)
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
      M.invoker.confirm({
        message: '删除后无法找回, 是否继续?',
        callback: async () => {
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
        }
      })
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
        model_id: this.comment.modal_id,
        comment_id: this.comment.id
      })
    }
  }
}
</script>
