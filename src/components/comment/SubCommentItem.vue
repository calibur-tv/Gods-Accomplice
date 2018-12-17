<style lang="scss">
.sub-comment-item {
  padding: 2px 10px;
  font-size: 14px;
  line-height: 18px;

  .nickname {
    color: $color-blue;
  }

  .comment-content {
    margin-right: 6px;
    word-break: break-all;
  }
}
</style>

<template>
  <div class="sub-comment-item">
    <a 
      :href="$alias.user(comment.from_user_zone)" 
      class="nickname" 
      v-text="comment.from_user_name"/>
    <template v-if="comment.to_user_zone">
      回复
      <a 
        :href="$alias.user(comment.to_user_zone)" 
        class="nickname" 
        v-text="comment.to_user_name"/>
    </template>
    :
    <span 
      class="reply-btn comment-content" 
      @click="handleSubCommentClick">{{ comment.content }}</span>
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
    }
  },
  data() {
    return {
      deleting: false
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
