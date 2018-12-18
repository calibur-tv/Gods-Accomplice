<style lang="scss">
#comment-detail {
  overflow-x: hidden;
  overflow-y: auto;
  margin-right: -$container-padding;

  .init-block {
    width: 100%;
    height: 100%;
    position: relative;

    p {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
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
        <div slot="extra">
          extra
        </div>
      </CommentItem>
      <div class="hr"/>
      <SubCommentList
        :parent-comment="comment"
        :in-detail="true"
        :type="model"
      />
      <Loadmore
        :loading="false"
        :fetch="loadSubComment"
      />
    </template>
    <div
      v-else
      class="init-block"
    >
      <p>加载中...</p>
    </div>
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
      id: 0,
      model: '',
      comment_id: 0,
      reply_id: 0,
      comment: null,
      loading: false,
      noMore: false,
      nothing: false,
      error: false,
      total: 0
    }
  },
  created() {
    this.loadMainComment()
  },
  methods: {
    loadSubComment() {

    },
    async loadMainComment() {
      if (this.loading || this.comment) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        this.comment = await api.getMainCommentItem({
          type: this.model,
          comment_id: this.comment_id,
          reply_id: this.reply_id
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
