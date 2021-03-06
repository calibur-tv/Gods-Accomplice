<style lang="scss">
#comment-wrap {
  margin-right: -$container-padding;

  .main-hr {
    background-color: $color-background-container;
    height: 10px;
    margin-left: -$container-padding;
  }

  .sub-title {
    margin-top: $container-padding;
    margin-bottom: $container-padding;
    font-size: 17px;
    line-height: 24px;

    span {
      @include half-font(11px, top);
      display: inline-block;
      color: $color-text-light;
      margin: 1px 0 0 -2px;
    }
  }

  .comment-nothing {
    text-align: center;
    margin: 20px 0 40px 0;
    padding-bottom: 20px;

    img {
      width: 140px;
      height: auto;
      margin-bottom: 15px;
    }

    p {
      font-size: 19px;
      color: $color-text-light;
      margin-bottom: 15px;
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
  <div id="comment-wrap">
    <div class="main-hr" />
    <!-- 主列表的头部 -->
    <h3 class="sub-title">
      评论 <span v-if="total">{{ total }}</span>
    </h3>
    <!-- 主列表的 list -->
    <template v-if="list.length">
      <div id="comment-list-wrap">
        <!-- 每条主评论 -->
        <CommentItem
          v-for="comment in list"
          :key="comment.id"
          :type="type"
          :comment="comment"
          :is-master="isMaster"
          @delete="deleteCommentCallback"
        />
      </div>
    </template>
    <Loadmore
      :no-more="noMore"
      :nothing="nothing"
      :error="error"
      :loading="loading"
      :fetch="getMainComments"
    >
      <div slot="nothing" class="comment-nothing">
        <img src="../../images/no-comment.png" />
        <p>还没有人发言呢！</p>
        <button @click="createMainComment">抢沙发</button>
      </div>
    </Loadmore>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import Loadmore from '@/components/Loadmore'
import Api from '@/api/v1/commentApi'

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
    isMaster: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      nothing: false,
      error: false,
      lastFetchId: 0,
      total: 0,
      list: [],
      noMore: false
    }
  },
  created() {
    this.getMainComments()
    M.channel.$on('create-main-comment', ({ data, exp, message }) => {
      this.total++
      this.list.push(data)
      this.nothing = false
      this.$toast.success(message)
      this.$utils.updateUserExp(exp)
      M.invoker.setUserInfo(M.user)
    })
  },
  methods: {
    async getMainComments() {
      if (this.loading || this.noMoreComment) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        const data = await api.getMainCommentList({
          id: this.id,
          type: this.type,
          fetchId: this.lastFetchId,
          onlySeeMaster: this.onlySeeMaster ? '1' : '0'
        })
        const { total, list, noMore } = data
        this.total = total
        this.noMore = noMore
        this.nothing = !total
        if (list.length) {
          const oldIds = this.list.map(_ => _.id)
          const filterdList = list.filter(_ => oldIds.indexOf(_.id) === -1)
          this.list = this.list.concat(filterdList)
          this.lastFetchId = list[list.length - 1].id
        }
      } catch (e) {
        this.error = true
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    },
    deleteCommentCallback({ id }) {
      this.list.forEach((item, index) => {
        if (item.id === id) {
          this.list.splice(index, 1)
          this.total--
        }
      })
    },
    createMainComment() {
      M.invoker.createMainComment({
        model_type: this.type,
        model_id: this.id
      })
    }
  }
}
</script>
