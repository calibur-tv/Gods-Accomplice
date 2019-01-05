<style lang="scss">
#comment-detail {
  padding-right: 0;

  .to-parent {
    color: $color-link;
    font-size: 14px;
    margin-top: 10px;
  }

  .hr {
    background-color: $color-background-container;
    height: 10px;
    margin-left: -$container-padding;
  }

  .comment-nothing {
    text-align: center;

    img {
      width: 140px;
      height: auto;
      margin-bottom: 10px;
    }

    p {
      font-size: 19px;
      color: $color-text-light;
    }

    button {
      width: 70px;
      height: 28px;
      border-radius: 14px;
      text-align: center;
      font-size: 13px;
      color: #fff;
      line-height: 28px;
      background-color: $color-red;
    }
  }
}
</style>

<template>
  <div id="comment-detail" class="container">
    <CommentItem
      :comment="comment"
      :in-detail="true"
      :type="modal_type"
      :master-id="-1"
    >
      <button v-if="reply_id" slot="extra" class="to-parent">查看原帖子</button>
    </CommentItem>
    <div class="hr" />
    <SubCommentList
      :parent-comment="comment"
      :in-detail="true"
      :type="modal_type"
    />
    <Loadmore
      :loading="loading"
      :nothing="nothing"
      :no-more="noMore"
      :error="error"
      :fetch="loadSubComment"
    >
      <div slot="nothing" class="comment-nothing" @click="createMainComment">
        <img src="../../../images/no-comment.png" />
        <p>还没有人回复呢！</p>
        <button @click="createSubComment">回复TA</button>
      </div>
    </Loadmore>
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
  data() {
    return {
      id: 0,
      content: '',
      images: [],
      modal_id: 1,
      created_at: '',
      floor_count: 0,
      to_user_id: 0,
      from_user_id: 0,
      from_user_name: '',
      from_user_zone: '',
      from_user_avatar: '',
      is_owner: true,
      is_master: false,
      is_leader: false,
      comments: {
        list: [],
        total: 0,
        noMore: false
      },
      modal_type: '',
      liked: false,
      like_count: 0,
      reply_id: 0,
      loading: false,
      noMore: false,
      nothing: false,
      error: false,
      lastFetchSubCommentId: 0
    }
  },
  computed: {
    comment() {
      return this
    }
  },
  created() {
    this.lastFetchSubCommentId = this.comments.total
      ? this.comments.list[this.comments.list.length - 1].id
      : 0
    M.channel.$on('create-sub-comment', ({ data, exp, message }) => {
      this.comments.total++
      this.comments.list.push(data)
      this.$toast.success(message)
      this.$utils.updateUserExp(exp)
      M.invoker.setUserInfo(M.user)
    })
  },
  methods: {
    async loadSubComment() {
      if (this.loading || this.noMore || !this.lastFetchSubCommentId) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        const data = await api.getSubCommentList({
          type: this.modal_type,
          id: this.id,
          maxId: this.lastFetchSubCommentId
        })
        const { total, list, noMore } = data
        this.comments.total = total
        this.comments.noMore = noMore
        this.noMore = noMore
        if (list.length) {
          const oldIds = this.comments.list.map(_ => _.id)
          const filterdList = list.filter(_ => oldIds.indexOf(_.id) === -1)
          this.comments.list = this.comments.list.concat(filterdList)
          this.lastFetchSubCommentId = list[list.length - 1].id
        }
      } catch (e) {
        this.error = true
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    },
    createSubComment() {
      M.invoker.createSubComment({
        model_type: this.modal_type,
        parent_comment_id: this.id,
        target_user_id: this.from_user_id,
        target_user_name: this.from_user_name
      })
    }
  }
}
</script>
