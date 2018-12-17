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

  .avatar {
    margin-right: 10px;
    float: left;
  }

  .content {
    overflow: hidden;
    padding-right: $container-padding;

    .header {
      margin-bottom: 3px;

      .tools-btn {
        float: right;
        line-height: 16px;
        font-size: 12px;
        color: #535353;
        padding-top: 9px;
        padding-left: 4px;
      }

      .user-nickname {
        .oneline {
          font-size: 16px;
          color: #22222b;
          line-height: 22px;
          font-weight: 500;
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
  <div :id="`comment-${comment.id}`" class="comment-item">
    <div class="avatar"><UserAvatar :size="35" :user="computeFromUser" /></div>
    <div class="content">
      <div class="header">
        <VPopover
          :actions="actions"
          :report-id="comment.id"
          :report-type="type + '_comment'"
        >
          <button class="tools-btn">···</button>
        </VPopover>
        <UserNickname :user="computeFromUser" />
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
          />
        </div>
      </div>
      <div class="footer">
        <div class="info">
          <span>{{ comment.floor_count - 1 }}楼</span>
          <VTime v-model="comment.created_at" />
        </div>
        <div class="social">
          <button
            :class="{ 'is-active': comment.liked }"
            @click="toggleLike"
          >
            <span v-if="comment.like_count">{{ comment.like_count }}</span>
            <img v-if="comment.liked" src="./images/like-active.png" />
            <img v-else src="./images/like.png" />
          </button>
        </div>
      </div>
      <SubCommentList :parent-comment="comment" :type="type" />
    </div>
  </div>
</template>

<script>
import SubCommentList from './SubCommentList'
import VPopover from '@/components/Popover'
import UserNickname from '@/components/UserNickname'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'CommentCommentItem',
  components: {
    VPopover,
    SubCommentList,
    UserNickname,
    UserAvatar
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
    },
    canDelete() {
      return this.isMine || this.currentUserId === this.masterId
    },
    actions() {
      const result = []
      if (this.canDelete) {
        result.push({
          name: '删除',
          method: this.deleteComment
        })
      }
      result.push({
        name: this.comment.liked ? '取消赞' : '点赞',
        method: this.toggleLike
      })

      return result
    }
  },
  methods: {
    async toggleLike() {
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.liking) {
        return
      }
      this.liking = true
      try {
        await this.$store.dispatch('comment/toggleLikeMainComment', {
          ctx: this,
          type: this.type,
          id: this.comment.id
        })
      } catch (e) {
        // do nothing
      } finally {
        this.liking = false
      }
    },
    deleteComment() {
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
          this.$store.dispatch('comment/deleteMainComment', {
            ctx: this,
            type: this.type,
            id: this.comment.id
          })
          this.$emit('delete')
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
