<style lang="scss">
#image-show {
  header {
    margin-top: 20px;

    .title {
      margin-bottom: 20px;
      color: #4c4c4c;
      font-size: 18px;
      font-weight: 800;
      line-height: 24px;
    }
  }

  main {
    margin-top: 15px;
    margin-left: -$container-padding;
    margin-right: -$container-padding;

    .images {
      .image {
        margin-bottom: 10px;
      }
    }
  }

  footer {
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .bangumi {
      font-size: 12px;
      color: #6d757a;
      font-weight: bold;
      margin-right: 20px;
      line-height: 18px;
      flex-shrink: 0;
    }

    .tags {
      font-size: 0;
      height: 18px;
      overflow: hidden;
      text-align: right;
      @extend %breakWord;

      span {
        display: inline-block;
        padding-left: 7px;
        padding-right: 7px;
        height: 18px;
        font-size: 12px;
        border-radius: 9px;
        line-height: 18px;
        background-color: #e5e9ef;
        color: #6d757a;
        margin-left: 5px;
      }
    }
  }
}
</style>

<template>
  <div id="image-show" class="container">
    <!-- 头部 -->
    <header>
      <!-- 标题 -->
      <div class="title">{{ name }}</div>
      <!-- 用户 -->
      <FlowHeaderUser
        v-if="user"
        :user="user"
        :is-followed="false"
        :time="created_at"
      />
    </header>
    <!-- 正文 -->
    <main>
      <section v-if="images.length" class="images">
        <span
          v-for="(item, index) in images"
          :key="index"
          @click="handleImagePreview(index)"
        >
          <VImg
            :src="item.url"
            :width="item.width"
            :height="item.height"
            :mime="item.type"
            :blur="true"
            :full="true"
            class="image"
          />
        </span>
      </section>
    </main>
    <!-- 番剧 -->
    <footer>
      <span v-if="bangumi" class="bangumi">来自：{{ bangumi.name }}</span>
    </footer>
    <VLazy> <CommentMain :id="id" :master-id="user.id" type="image" /> </VLazy>
  </div>
</template>

<script>
import FlowHeaderUser from '@/components/FlowHeaderUser'
import CommentMain from '@/components/comment/CommentMain'

export default {
  name: 'App',
  components: {
    FlowHeaderUser,
    CommentMain
  },
  data() {
    return {
      id: 0,
      images: [],
      bangumi: null,
      user: null,
      name: '',
      created_at: ''
    }
  },
  methods: {
    handleImagePreview(index) {
      M.invoker.previewImages({
        index,
        images: this.images
      })
    }
  }
}
</script>
