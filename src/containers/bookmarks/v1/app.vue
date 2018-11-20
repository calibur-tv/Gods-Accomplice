<style lang="scss">
#bookmarks {
  .van-tabs {
    &__warp {
      position: relative;
      z-index: 1;
    }

    &__content {
      position: relative;
      min-height: 100vh;
      margin-top: -44px;
      padding-top: 44px;
      z-index: 0;
    }

    .van-tab__pane {
      padding-left: $container-padding;
      padding-right: $container-padding;
    }
  }

  ul {
    margin-bottom: $container-padding !important;
  }

  .posts {
    .deleted {
      text-decoration: line-through;
      cursor: default;
    }

    li {
      margin-top: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px dashed #eee;
    }
  }

  .images {
    width: 290px;
    margin: 0 auto;
    @extend %clearfix;

    li {
      position: relative;
      margin-top: 10px;
      width: 140px;
      float: left;
      box-shadow: 0 1px 3px 0 rgba(80, 80, 80, 0.11);
      border-radius: 4px;
      overflow: hidden;

      .delete-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 180px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
      }

      img {
        display: block;
        transition: 0.3s;
        transform-origin: center;
      }

      &:hover {
        img {
          transform: scale(1.1);
        }
      }

      &:nth-of-type(odd) {
        margin-right: 10px;
      }
    }
  }

  .answers {
    .deleted {
      text-decoration: line-through;
      cursor: default;
    }

    li {
      margin-top: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px dashed #eee;
      @include mutiline(20px);
    }
  }

  .scores {
    .deleted {
      text-decoration: line-through;
      cursor: default;
    }

    li {
      margin-top: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px dashed #eee;

      a {
        font-weight: 500;
      }

      p {
        margin-top: 10px;
        color: #999999;
      }
    }
  }

  .videos {
    li {
      margin-top: 10px;
    }

    a {
      display: block;
      @extend %clearfix;
    }

    .poster {
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      display: block;
      margin-right: 10px;
      float: left;

      .delete-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 80px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }

    .text {
      overflow: hidden;
      line-height: 20px;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <div id="bookmarks">
    <van-tabs
      v-model="active"
      :sticky="true"
      :swipeable="true"
      color="#ff8eb3"
      @change="handleTabSwitch"
    >
      <van-tab title="帖子">
        <ul class="posts">
          <li
            v-for="item in source[0].list"
            :key="item.id"
          >
            <a
              :class="[ item.deleted_at ? 'deleted' : 'blue-link' ]"
              href="javascript:;"
              v-text="item.title"
            />
          </li>
        </ul>
        <loadmore
          :auto="false"
          :loading="source[0].loading"
          :no-more="source[0].noMore"
          :nothing="!source[0].list.length"
          :error="source[0].error"
          :fetch="loadMoreData"
        />
      </van-tab>
      <van-tab title="相册">
        <ul class="images">
          <li
            v-for="item in source[1].list"
            :key="item.id"
          >
            <a href="javascript:;">
              <v-img
                :src="item.url"
                :width="140"
                :height="180"
              />
              <div
                v-if="item.deleted_at"
                class="delete-mask"
              >该相册已删除</div>
            </a>
          </li>
        </ul>
        <loadmore
          :auto="false"
          :loading="source[1].loading"
          :no-more="source[1].noMore"
          :nothing="!source[1].list.length"
          :error="source[1].error"
          :fetch="loadMoreData"
        />
      </van-tab>
      <van-tab title="答案">
        <ul class="answers">
          <li
            v-for="item in source[2].list"
            :key="item.id"
          >
            <a
              :class="[ item.deleted_at ? 'deleted' : 'blue-link' ]"
              href="javascript:;"
              v-text="item.intro || '[图片]'"
            />
          </li>
        </ul>
        <loadmore
          :auto="false"
          :loading="source[2].loading"
          :no-more="source[2].noMore"
          :nothing="!source[2].list.length"
          :error="source[2].error"
          :fetch="loadMoreData"
        />
      </van-tab>
      <van-tab title="漫评">
        <ul class="scores">
          <li
            v-for="item in source[3].list"
            :key="item.id"
          >
            <a
              :class="[ item.deleted_at ? 'deleted' : 'blue-link' ]"
              href="javascript:;"
              v-text="item.title"
            />
            <p v-text="item.intro || '[图片]'"/>
          </li>
        </ul>
        <loadmore
          :auto="false"
          :loading="source[3].loading"
          :no-more="source[3].noMore"
          :nothing="!source[3].list.length"
          :error="source[3].error"
          :fetch="loadMoreData"
        />
      </van-tab>
      <van-tab title="视频">
        <ul class="videos">
          <li
            v-for="item in source[4].list"
            :key="item.id"
          >
            <a href="javascript:;">
              <div class="poster">
                <v-img
                  :src="item.poster"
                  :width="120"
                  :height="80"
                />
                <div
                  v-if="item.deleted_at"
                  class="delete-mask"
                >
                  视频已失效
                </div>
              </div>
              <p
                class="name"
                v-text="item.name"
              />
            </a>
          </li>
        </ul>
        <loadmore
          :auto="false"
          :loading="source[4].loading"
          :no-more="source[4].noMore"
          :nothing="!source[4].list.length"
          :error="source[4].error"
          :fetch="loadMoreData"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import Api from '@/api/v1/selfApi'
import Loadmore from '@/components/Loadmore.vue'

export default {
  name: 'App',
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    Loadmore
  },
  props: {},
  data() {
    return {
      active: 0,
      type: 'post',
      source: [
        {
          noMore: false,
          error: false,
          loading: false,
          list: [],
          total: 0,
          page: 0
        },
        {
          noMore: false,
          error: false,
          loading: false,
          list: [],
          total: 0,
          page: 0
        },
        {
          noMore: false,
          error: false,
          loading: false,
          list: [],
          total: 0,
          page: 0
        },
        {
          noMore: false,
          error: false,
          loading: false,
          list: [],
          total: 0,
          page: 0
        },
        {
          noMore: false,
          error: false,
          loading: false,
          list: [],
          total: 0,
          page: 0
        }
      ]
    }
  },
  created() {
    this.getData(true, 'post')
  },
  methods: {
    handleTabSwitch(index) {
      let type
      if (index === 0) {
        type = 'post'
      } else if (index === 1) {
        type = 'image'
      } else if (index === 2) {
        type = 'answer'
      } else if (index === 3) {
        type = 'score'
      } else if (index === 4) {
        type = 'video'
      }
      this.getData(true, type)
    },
    loadMoreData(type) {
      this.getData(false, type)
    },
    async getData(init = false, type) {
      const currentActive = this.active
      if (
        (this.source[currentActive].page && init) ||
        (this.source[currentActive].error && init)
      ) {
        return
      }
      if (
        this.source[currentActive].loading ||
        this.source[currentActive].noMore
      ) {
        return
      }
      const api = new Api(this)
      this.source[currentActive].loading = true
      try {
        const data = await api.getBookmarks({
          page: this.source[currentActive].page,
          take: 16,
          type
        })
        this.source[currentActive].list = this.source[
          currentActive
        ].list.concat(data.list)
        this.source[currentActive].noMore = data.noMore
        this.source[currentActive].total = data.total
        this.source[currentActive].page++
      } catch (e) {
        this.source[currentActive].error = true
        this.$toast.error(e)
      } finally {
        this.source[currentActive].loading = false
      }
    }
  }
}
</script>
