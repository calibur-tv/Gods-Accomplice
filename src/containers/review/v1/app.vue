<style lang="scss">
#review-show {
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
    .stars {
      font-size: 0;
      margin-bottom: 15px;

      .star-item {
        display: inline-block;
        width: 50%;
        height: 36px;
        margin-bottom: 10px;

        .label {
          font-size: 12px;
          margin-bottom: 3px;
        }
      }
    }
  }

  footer {
    margin-left: $container-padding;
    margin-right: $container-padding;
  }
}
</style>

<template>
  <div id="review-show">
    <!-- 头部 -->
    <header class="container">
      <!-- 标题 -->
      <div class="title">{{ title }}</div>
      <!-- 用户 -->
      <FlowHeaderUser
        v-if="user"
        :user="user"
        :is-followed="false"
        :time="created_at"
      />
    </header>
    <main>
      <section class="stars container">
        <div v-for="(item, index) in columns" :key="index" class="star-item">
          <div
            class="label"
            v-text="`${labelMap[item]}：${info[item] * 2}分`"
          />
          <VRate v-model="info[item]" disabled allow-half />
        </div>
      </section>
      <JsonContent :content="content" />
    </main>
    <footer>
      <VLazy>
        <CommentMain :id="id" :master-id="user.id" type="score" />
      </VLazy>
    </footer>
  </div>
</template>

<script>
import { Rate } from 'element-ui'
import JsonContent from '@/components/jsonEditor/parser/index.vue'
import FlowHeaderUser from '@/components/FlowHeaderUser'
import CommentMain from '@/components/comment/CommentMain'

export default {
  name: 'App',
  components: {
    VRate: Rate,
    JsonContent,
    CommentMain,
    FlowHeaderUser
  },
  props: {},
  data() {
    const labelMap = {
      lol: '笑点',
      cry: '泪点',
      fight: '燃点',
      moe: '萌点',
      sound: '音乐',
      vision: '画面',
      story: '情节',
      role: '人设',
      express: '内涵',
      style: '美感'
    }
    return {
      labelMap,
      columns: Object.keys(labelMap),
      bangumi: null,
      content: [],
      created_at: '',
      cry: '',
      express: '',
      fight: '',
      id: 0,
      intro: '',
      is_creator: false,
      like_users: null,
      liked: false,
      lol: '',
      mark_users: null,
      marked: false,
      moe: '',
      published_at: '',
      reward_users: null,
      rewarded: false,
      role: '',
      sound: '',
      story: '',
      style: '',
      title: '',
      total: '',
      updated_at: '',
      user: null,
      view_count: 0,
      vision: ''
    }
  },
  computed: {
    info() {
      const result = {}
      Object.keys(this).forEach(key => {
        if (this.columns.indexOf(key) !== -1) {
          result[key] = +this[key]
        }
      })
      return result
    }
  },
  created() {
    this.$channel.$on('json-editor-image-click', image => {
      const images = this.content
        .filter(_ => _.type === 'img')
        .map(_ => {
          return {
            width: _.width,
            height: _.height,
            url: _.url,
            size: _.size,
            type: _.mime
          }
        })
      let index = 0
      images.forEach((item, i) => {
        if (item.url === image.url) {
          index = i
        }
      })
      M.invoker.previewImages({
        index,
        images
      })
    })
  }
}
</script>
