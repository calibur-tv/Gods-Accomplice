<style lang="scss">
#post-show {
  .flow-content {
    .content {
      font-size: 17px;
      line-height: 30px;
      margin-bottom: 15px;
      color: $color-text-normal;

      p:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  }
}
</style>

<template>
  <div v-if="post" id="post-show" class="container">
    <!-- 头部 -->
    <header class="flow-header">
      <!-- 用户 -->
      <FlowHeaderUser
        v-if="user"
        :user="user"
        :is-followed="false"
        :time="post.created_at"
      />
      <!-- 标题 -->
      <div class="title">{{ post.title }}</div>
    </header>
    <!-- 正文 -->
    <main class="flow-content">
      <section v-if="post.images.length" class="flow-images">
        <VImg
          v-for="(item, index) in post.images"
          :key="index"
          :src="item.url"
          :width="item.width"
          :height="item.height"
          :mime="item.type"
          :blur="true"
          :full="true"
          class="image"
          @click="handleImagePreview(index)"
        />
      </section>
      <section class="content" v-html="post.content" />
    </main>
    <!-- 番剧 -->
    <footer>
      <FlowTagList :bangumi="bangumi" :tags="post.tags" />
      <FlowRewardPanel
        v-if="post.is_creator"
        :id="post.id"
        :reward-users="post.reward_users"
        :rewarded="post.rewarded"
        type="post"
        @reward="handleReward"
      />
    </footer>
    <VLazy>
      <CommentMain :id="post.id" :master-id="user.id" type="post" />
    </VLazy>
  </div>
</template>

<script>
import CommentMain from '@/components/comment/CommentMain'
import FlowHeaderUser from '@/components/FlowHeaderUser'
import FlowTagList from '@/components/FlowTagList'
import FlowRewardPanel from '@/components/FlowRewardPanel'

export default {
  name: 'App',
  components: {
    CommentMain,
    FlowHeaderUser,
    FlowTagList,
    FlowRewardPanel
  },
  data() {
    return {
      post: null,
      bangumi: null,
      user: null
    }
  },
  methods: {
    handleImagePreview(index) {
      M.invoker.previewImages({
        index,
        images: this.post.images
      })
    },
    handleReward() {
      const currentUser = M.user
      this.post.rewarded = true
      this.post.reward_users.total++
      this.post.reward_users.list.unshift({
        id: currentUser.id,
        zone: currentUser.zone,
        avatar: currentUser.avatar,
        nickname: currentUser.nickname,
        created_at: parseInt(Date.now() / 1000)
      })
    },
    createMainComment() {
      M.invoker.createMainComment({
        model_type: 'post',
        model_id: this.post.id
      })
    }
  }
}
</script>
