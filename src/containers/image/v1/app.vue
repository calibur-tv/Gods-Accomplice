<style lang="scss">
#image-show {
  .flow-content {
    margin-left: -$container-padding;
    margin-right: -$container-padding;
  }

  .no-image {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 12px;
  }
}
</style>

<template>
  <div id="image-show" class="container">
    <!-- 头部 -->
    <header class="flow-header">
      <!-- 用户 -->
      <FlowHeaderUser
        v-if="user"
        :user="user"
        :is-followed="false"
        :time="created_at"
      />
      <!-- 标题 -->
      <div class="title">{{ name }}</div>
    </header>
    <!-- 正文 -->
    <main class="flow-content">
      <template v-if="is_album">
        <section v-if="images.length" class="flow-images">
          <VImg
            v-for="(item, index) in images"
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
        <p
          v-if="!images.image_count"
          class="no-image"
        >
          还没有上传图片
        </p>
      </template>
      <section v-else class="flow-images">
        <VImg
          :src="source.url"
          :width="source.width"
          :height="source.height"
          :mime="source.type"
          :blur="true"
          :full="true"
          class="image"
          @click="handleImagePreview(0)"
        />
      </section>
    </main>
    <!-- 番剧 -->
    <footer>
      <FlowTagList :bangumi="bangumi"/>
      <FlowRewardPanel
        v-if="is_creator"
        :reward-users="reward_users"
        :rewarded="rewarded"
        :user-id="user.id"
      />
    </footer>
    <VLazy> <CommentMain :id="id" :master-id="user.id" type="image" /> </VLazy>
  </div>
</template>

<script>
import FlowHeaderUser from '@/components/FlowHeaderUser'
import FlowTagList from '@/components/FlowTagList'
import FlowRewardPanel from '@/components/FlowRewardPanel'
import CommentMain from '@/components/comment/CommentMain'

export default {
  name: 'App',
  components: {
    FlowHeaderUser,
    CommentMain,
    FlowRewardPanel,
    FlowTagList
  },
  data() {
    return {
      id: 0,
      images: [],
      bangumi: null,
      user: null,
      name: '',
      is_album: false,
      is_creator: false,
      rewarded: false,
      reward_users: null,
      source: null,
      created_at: ''
    }
  },
  methods: {
    handleImagePreview(index) {
      M.invoker.previewImages({
        index,
        images: this.is_album ? this.images : [this.source]
      })
    }
  }
}
</script>
