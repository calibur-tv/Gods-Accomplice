<style lang="scss">
#review-show {
  header {
    margin-top: 20px;
    margin-bottom: 15px;

    .title {
      margin-bottom: 20px;
      color: #4c4c4c;
      font-size: 18px;
      font-weight: 800;
      line-height: 24px;

      .creator-badge {
        display: inline-block;
        background-color: orange;
        color: #fff;
        border-radius: 4px;
        font-weight: 500;
        font-size: 12px;
        padding: 0 3px;
        line-height: 17px;
        margin-top: -3px;
      }
    }

    .user {
      @extend %clearfix;

      .total {
        float: right;
        font-weight: bold;
        font-size: 23px;
        letter-spacing: 1px;
        margin-left: 10px;
        color: #ff9900;
        line-height: 42px;
      }

      .user-avatar {
        float: left;
        margin-right: 10px;
      }

      .info {
        overflow: hidden;

        time {
          font-size: 12px;
          color: $color-gray-text;
        }
      }
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
}
</style>

<template>
  <div id="review-show">
    <!-- 头部 -->
    <header class="container">
      <!-- 标题 -->
      <div class="title">{{ title }}</div>
      <!-- 用户 -->
      <div
        v-if="user"
        class="user"
      >
        <div class="total">{{ total }}分</div>
        <user-avatar :user="user"/>
        <div class="info">
          <user-nickname :user="user"/>
          <v-time :datetime="created_at"/>
        </div>
      </div>
    </header>
    <main>
      <section class="stars container">
        <div
          v-for="(item, index) in columns"
          :key="index"
          class="star-item"
        >
          <div
            class="label"
            v-text="`${labelMap[item]}：${info[item] * 2}分`"
          />
          <v-rate
            v-model="info[item]"
            disabled
            allow-half
          />
        </div>
      </section>
      <json-content :content="content"/>
    </main>
  </div>
</template>

<script>
import { Rate } from 'element-ui'
import JsonContent from '@/components/jsonEditor/parser/index.vue'

export default {
  name: 'App',
  components: {
    VRate: Rate,
    JsonContent
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
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
