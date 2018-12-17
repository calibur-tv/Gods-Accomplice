<style lang="scss">
#comment-wrap {
  .sub-title {
    margin-top: 15px;
    margin-bottom: 15px;

    .write-btn {
      float: right;
      font-weight: bold;
      font-size: 13px;
    }
  }

  #comment-list-footer {
    margin-left: -$container-padding;
    margin-right: -$container-padding;
  }

  .no-content {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 12px;
    color: #99a2aa;
  }
}
</style>

<template>
  <div id="comment-wrap">
    <!-- 主列表的头部 -->
    <slot name="header">
      <h3 class="sub-title">
        评论{{ total ? `(${total})` : '' }}
      </h3>
    </slot>
    <!-- 主列表的 list -->
    <template v-if="list.length">
      <div id="comment-list-wrap">
        <!-- 每条主评论 -->
        <div
          v-for="comment in list"
          :key="comment.id"
          class="comment-item-wrap"
        >
          <!-- 主评论的内容 -->
          <slot 
            :comment="comment" 
            name="comment-item"
          >
            <comment-item
              :type="type"
              :comment="comment"
              :master-id="masterId"
              @delete="deleteCommentCallback"
            />
          </slot>
        </div>
      </div>
    </template>
    <p
      v-else-if="emptyText" 
      class="no-content" 
      v-text="emptyText"
    />
    <load-more
      :no-more="noMore"
      :loading="loadingMainComment"
      :auto="true"
      @fetch="loadMoreMainComment(false)"
    />
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import Loadmore from '@/components/Loadmore'

export default {
  name: 'CommentMain',
  components: {
    CommentItem,
    Loadmore
  },
  props: {
    id: {
      required: true,
      type: [Number, String]
    },
    type: {
      required: true,
      type: String,
      validator: val =>
        ~[
          'post',
          'video',
          'image',
          'score',
          'question',
          'answer',
          'role'
        ].indexOf(val)
    },
    onlySeeMaster: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '暂无评论，快来抢沙发吧╮(￣▽￣)╭！'
    },
    masterId: {
      required: true,
      type: Number
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingMainComment: false
    }
  },
  computed: {
    store() {
      return this.$store.state.comment
    },
    list() {
      return this.store.list
    },
    noMore() {
      return this.store.noMore
    },
    total() {
      return this.store.total
    },
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    }
  },
  mounted() {},
  methods: {
    async loadMoreMainComment(firstRequest = false) {
      if (this.loadingMainComment) {
        return
      }
      this.loadingMainComment = true
      try {
        await this.$store.dispatch('comment/getMainComments', {
          ctx: this,
          type: this.type,
          id: this.id,
          onlySeeMaster: this.onlySeeMaster ? 1 : 0,
          firstRequest
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loadingMainComment = false
      }
    },
    async loadMoreSubComment() {
      if (this.loadingSubComment) {
        return
      }
      this.loadingSubComment = true
      try {
        await this.$store.dispatch('comment/getSubComments', {
          ctx: this,
          type: this.type,
          id: this.focusCommentId
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loadingSubComment = false
      }
    },
    async toggleFocusCommentLike() {
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.replyForm.liking) {
        return
      }
      this.replyForm.liking = true
      try {
        await this.$store.dispatch('comment/toggleLikeMainComment', {
          ctx: this,
          type: this.type,
          id: this.focusCommentId
        })
      } catch (e) {
      } finally {
        this.replyForm.liking = false
      }
    },
    writeComment() {
      this.$channel.$emit(`open-create-comment-drawer-${this.type}-${this.id}`)
    },
    closeCommentDrawer() {
      // close
    },
    submitCommentCallback() {
      // open
      this.$emit('create-main-comment')
    },
    deleteCommentCallback() {
      this.$emit('delete-main-comment')
    }
  }
}
</script>
