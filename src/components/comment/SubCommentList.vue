<style lang="scss">
.sub-comment-list-wrap {
  position: relative;
  background-color: #f7f8fa;
  border-radius: 5px;

  .sub-comment-list {
    padding: 7px 0 7.5px;
    margin-top: 5px;
  }

  .load-all-comment {
    position: relative;
    margin-top: 6px;
    font-size: 12px;
    margin-bottom: 0;
    padding: 0 10px;
    color: #999;
    width: 100%;
    text-align: left;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      border: 3px solid #f5f5f5;
      border-left-color: #999;
      transform: translateY(-50%);
      margin-left: 4px;
    }
  }
}
</style>

<template>
  <div class="sub-comment-list-wrap">
    <div v-if="hasComment" class="sub-comment-list">
      <SubCommentItem
        v-for="comment in filterComments"
        :key="comment.id"
        :comment="comment"
        :parent-user-id="authorId"
        :parent-comment-id="parentComment.id"
        :type="type"
      />
      <button
        v-if="!comments.noMore || comments.list.length > 5"
        class="load-all-comment"
        @click="loadAllComment"
      >
        查看全部{{ comments.total }}条评论
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
      const data = this.comments
      const comments = data.list
      const result = comments.slice(0, 5)
      if (comments.every(_ => _.id <= data.maxId)) {
        return result
      }
      const ids = result.map(_ => _.id)
      return result.concat(
        comments.filter(_ => _.id > data.maxId && ids.indexOf(_.id) === -1)
      )
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
