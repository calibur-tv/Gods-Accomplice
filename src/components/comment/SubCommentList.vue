<style lang="scss">
.sub-comment-list-wrap {
  &.in-detail {
    margin-right: $container-padding;
  }

  .reply-title {
    margin-top: $container-padding;
    font-size: 17px;
    line-height: 24px;

    span {
      @include half-font(11px, top);
      display: inline-block;
      color: #a4a4ae;
      margin: 1px 0 0 -2px;
    }
  }

  .load-all-comment {
    position: relative;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: #49689b;
    width: 100%;
    text-align: left;

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
  }
}
</style>

<template>
  <div
    v-if="total"
    :class="{ 'in-detail': inDetail }"
    class="sub-comment-list-wrap"
  >
    <h3
      v-if="inDetail"
      class="reply-title"
    >
      回复
      <span>{{ total }}</span>
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
      />
      <button
        v-if="showCollapseBtn"
        class="load-all-comment"
        @click="loadAllComment"
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
      return !this.inDetail && (!this.comments.noMore || this.comments.list.length > 2)
    },
    filterComments() {
      return this.inDetail ? this.comments.list : this.comments.list.slice(0, 2)
    }
  },
  methods: {
    loadAllComment() {
      this.$channel.$emit('load-all-sub-comment', {
        id: this.parentComment.id
      })
    }
  }
}
</script>
