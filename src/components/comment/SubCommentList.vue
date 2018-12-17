<style lang="scss">
.sub-comment-list-wrap {
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
  <div v-if="hasComment" class="sub-comment-list-wrap">
    <div class="sub-comment-list">
      <SubCommentItem
        v-for="comment in filterComments"
        :key="comment.id"
        :comment="comment"
        :parent-user-id="authorId"
        :parent-comment-id="parentComment.id"
        :type="type"
      />
      <button
        v-if="!comments.noMore || comments.list.length > 2"
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
    }
  },
  computed: {
    comments() {
      return this.parentComment.comments
    },
    authorId() {
      return this.parentComment.from_user_id
    },
    hasComment() {
      return !!this.comments.list.length
    },
    filterComments() {
      return this.comments.list.slice(0, 2)
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
