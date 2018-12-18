<style lang="scss">
#comment-detail {
  padding-right: 0;

  .init-block {
    width: 100%;
    height: 100%;
    position: relative;

    p {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .to-parent {
    color: #49689b;
    font-size: 14px;
    margin-top: 10px;
  }

  .hr {
    background-color: #edf1f4;
    height: 10px;
    margin-left: -$container-padding;
  }
}
</style>

<template>
  <div id="comment-detail" class="container">
    <template v-if="comment">
      <CommentItem
        :comment="comment"
        :in-detail="true"
        :type="model"
        :master-id="-1"
      >
        <button v-if="reply_id" slot="extra" class="to-parent">
          查看原帖子
        </button>
      </CommentItem>
      <div class="hr" />
      <SubCommentList
        :parent-comment="comment"
        :in-detail="true"
        :type="model"
      />
      <Loadmore
        :loading="loadingSubComment"
        :nothing="nothing"
        :no-more="noMore"
        :error="error"
        :fetch="loadSubComment"
      />
    </template>
    <div v-else class="init-block"><p>加载中...</p></div>
  </div>
</template>

<script>
import Api from '@/api/v1/commentApi'
import CommentItem from '@/components/comment/CommentItem'
import SubCommentList from '@/components/comment/SubCommentList'
import Loadmore from '@/components/Loadmore'

export default {
  name: 'App',
  components: {
    CommentItem,
    SubCommentList,
    Loadmore
  },
  props: {},
  data() {
    return {
      model: '',
      model_id: 0,
      comment_id: 0,
      reply_id: 0,
      comment: null,
      loadingMainComment: false,
      loadingSubComment: false,
      noMore: false,
      nothing: false,
      error: false,
      lastFetchSubCommentId: 0
    }
  },
  created() {
    this.loadMainComment()
  },
  methods: {
    async loadSubComment() {
      if (
        this.loadingSubComment ||
        this.noMore ||
        !this.lastFetchSubCommentId
      ) {
        return
      }
      this.loadingSubComment = true
      const api = new Api()
      try {
        const data = await api.getSubCommentList({
          type: this.model,
          id: this.comment_id,
          maxId: this.lastFetchSubCommentId
        })
        const { total, list, noMore } = data
        this.comment.comments.total = total
        this.comment.comments.noMore = noMore
        this.noMore = noMore
        if (list.length) {
          const oldIds = this.comment.comments.list.map(_ => _.id)
          const filterdList = list.filter(_ => oldIds.indexOf(_.id) === -1)
          this.comment.comments.list = this.comment.comments.list.concat(
            filterdList
          )
          this.lastFetchSubCommentId = list[list.length - 1].id
        }
      } catch (e) {
        this.error = true
        this.$toast.error(e)
      } finally {
        this.loadingSubComment = false
      }
    },
    async loadMainComment() {
      if (this.loadingMainComment || this.comment) {
        return
      }
      this.loadingMainComment = true
      const api = new Api()
      try {
        const data = await api.getMainCommentItem({
          type: this.model,
          comment_id: this.comment_id,
          reply_id: this.reply_id
        })
        this.comment = data
        if (data.comments.total) {
          this.lastFetchSubCommentId =
            data.comments.list[data.comments.list.length - 1].id
        } else {
          this.nothing = true
        }
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loadingMainComment = false
      }
    }
  }
}
</script>
