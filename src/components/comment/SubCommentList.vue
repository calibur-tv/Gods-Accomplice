<style lang="scss">
.sub-comment-list-wrap {
  &.in-detail {
    margin-right: 20px;
  }

  .reply-title {
    margin-top: $container-padding;
    font-size: 17px;
    line-height: 24px;

    span {
      @include half-font(11px, top);
      display: inline-block;
      color: $color-text-light;
      margin: 1px 0 0 -2px;
    }
  }

  .load-all-comment {
    position: relative;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: $color-link;
    width: 100%;
    text-align: left;

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
  }
}
</style>

<template>
  <div
    v-if="total"
    :class="{ 'in-detail': inDetail }"
    class="sub-comment-list-wrap"
  >
    <h3 v-if="inDetail" class="reply-title">
      回复 <span>{{ total }}</span>
    </h3>
    <div class="sub-comment-list">
      <SubCommentItem
        v-for="comment in filterComments"
        :key="comment.id"
        :comment="comment"
        :parent-user-id="authorId"
        :parent-comment-id="parentComment.id"
        :type="type"
        :in-detail="inDetail"
        @delete="handleSubCommentDelete"
      />
      <button
        v-if="showCollapseBtn"
        class="load-all-comment"
        @click.stop="loadAllComment"
      >
        全部{{ comments.total }}条回复
      </button>
    </div>
  </div>
</template>

<script>
import SubCommentItem from './SubCommentItem'

export default {
  name: 'PostSubCommentList',
  components: {
    SubCommentItem
  },
  props: {
    parentComment: {
      required: true,
      type: Object
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
  computed: {
    comments() {
      return this.parentComment.comments
    },
    authorId() {
      return this.parentComment.from_user_id
    },
    total() {
      return this.comments.total
    },
    showCollapseBtn() {
      return (
        !this.inDetail &&
        (!this.comments.noMore || this.comments.list.length > 2)
      )
    },
    filterComments() {
      return this.inDetail ? this.comments.list : this.comments.list.slice(0, 2)
    }
  },
  methods: {
    loadAllComment() {
      if (this.inDetail) {
        return
      }
      this.$alias.comment({
        type: this.type,
        comment_id: this.parentComment.id
      })
    },
    handleSubCommentDelete({ id }) {
      this.comments.list.forEach((item, index) => {
        if (item.id === id) {
          this.comments.list.splice(index, 1)
          this.comments.total--
        }
      })
    }
  }
}
</script>
