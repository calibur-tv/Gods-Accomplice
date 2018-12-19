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
        .tool-btn {
          display: block;

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

      button {
        display: block;
        height: 20px;

        &.is-active {
          color: #ff6881;
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
        <UserNickname :user="computeFromUser" />
        <div class="right-btn">
          <UserFollowBtn
            v-if="inDetail"
            :user-id="computeFromUser.id"
            :followed="false"
            class="user-follow-button"
          />
          <button v-else class="tool-btn">
            <img src="./images/dots.png" />
          </button>
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
            <span v-if="comment.like_count">{{ comment.like_count }}</span>
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
      return 0
    },
    computeFromUser() {
      return {
        id: this.comment.from_user_id,
        avatar: this.comment.from_user_avatar,
        nickname: this.comment.from_user_name,
        zone: this.comment.from_user_zone
      }
    },
    isMine() {
      return this.currentUserId === this.comment.from_user_id
    }
  },
  methods: {
    async toggleLike() {
      if (this.liking) {
        return
      }
      this.liking = true
      try {
        const result = !this.this.comment.liked
        this.comment.liked = result
        this.comment.like_count = result
          ? this.comment.like_count--
          : this.comment.like_count++
        const api = new Api()
        await api.toggleLikeMainComment({
          type: this.type,
          id: this.comment.id
        })
      } finally {
        this.liking = false
      }
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
