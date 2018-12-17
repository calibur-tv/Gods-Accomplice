<style lang="scss">
.comment-item {
  position: relative;
  margin-top: $container-padding;
  padding-bottom: $container-padding;

  .avatar {
    float: left;
    margin-right: 9px;
  }

  .content {
    overflow: hidden;

    .header {
      .tools-btn {
        float: right;
        line-height: 16px;
        font-size: 12px;
        color: #535353;
        padding-top: 9px;
        padding-left: 4px;
      }

      .user {
        .nickname {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          display: block;
          color: #333;
          margin-bottom: 1px;

          span {
            margin-right: 2px;
          }

          .icon-leader {
            color: $color-pink;
            font-size: 14px;
          }

          .icon-master {
            color: $color-blue;
            font-size: 13px;
          }
        }

        .info {
          color: #999;
          line-height: 14px;
          font-size: 12px;

          span {
            margin-right: 5px;
          }
        }
      }
    }

    .main {
      font-size: 16px;
      margin: 10px 0 4px;
      color: #333;
      line-height: 24px;
      min-height: 65px;

      .image-area {
        margin: 10px 0;

        img {
          width: 100%;
          height: auto;
        }
      }
    }

    .footer {
      .social {
        font-size: 12px;

        .reply-liked-btn {
          color: $color-blue;
        }

        button {
          color: #666;
          padding-left: 3px;
          padding-top: 11px;
        }
      }
    }
  }
}
</style>

<template>
  <div 
    :id="`comment-${comment.id}`" 
    class="comment-item">
    <a 
      :href="$alias.user(comment.from_user_zone)" 
      class="avatar">
      <v-img
        :src="comment.from_user_avatar"
        :avatar="true"
        size="35"
      />
    </a>
    <div class="content">
      <div class="header">
        <v-popover
          :actions="actions"
          :report-id="comment.id"
          :report-type="type + '_comment'"
        >
          <button class="tools-btn">···</button>
        </v-popover>
        <div class="user">
          <a
            :href="$alias.user(comment.from_user_zone)"
            class="nickname oneline"
          >
            <span v-text="comment.from_user_name"/>
            <span v-if="comment.is_owner">(楼主)</span>
            <i
              v-if="comment.is_leader"
              class="iconfont icon-leader"
            />
            <i
              v-else-if="comment.is_master"
              class="iconfont icon-master"
            />
          </a>
          <div class="info">
            <span>第{{ comment.floor_count - 1 }}楼</span>
            <span>·</span>
            <v-time v-model="comment.created_at"/>
          </div>
        </div>
      </div>
      <div 
        class="main" 
        v-html="comment.content"/>
      <div class="footer">
        <sub-comment-list
          :parent-comment="comment"
          :type="type"
        />
        <div class="social">
          <button
            :class="[ comment.liked ? 'reply-liked-btn' : 'reply-like-btn' ]"
            @click="toggleLike"
          >
            <i class="iconfont icon-icon_good"/>
            {{ comment.liked ? '已赞' : '赞' }}
            <span v-if="comment.like_count">({{ comment.like_count }})</span>
          </button>
          <button 
            class="reply-btn fr" 
            @click="handleCommentBtnClick">
            回复
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubCommentList from './SubCommentList'
import VPopover from '@/components/Popover'

export default {
  name: 'CommentCommentItem',
  components: {
    VPopover,
    SubCommentList
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
      return this.$store.state.login ? this.$store.state.user.id : 0
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
    },
    handleCommentBtnClick() {
      this.$channel.$emit('reply-comment', {
        id: this.comment.id,
        targetUserId: this.comment.from_user_id,
        targetUserName: this.comment.from_user_name
      })
    }
  }
}
</script>
