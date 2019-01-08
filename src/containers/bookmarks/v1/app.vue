<style lang="scss">
#bookmarks {
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
      border-bottom: 1px dashed $color-line;
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
        pointer-events: none;
      }

      &:nth-of-type(odd) {
        margin-right: 10px;
      }
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
      border-bottom: 1px dashed $color-line;

      div {
        font-weight: 500;
      }

      p {
        color: $color-text-gray;
        font-size: 12px;
      }
    }
  }

  .videos {
    li {
      margin-top: 10px;
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
    <VanTabs
      v-model="active"
      :sticky="true"
      :swipeable="true"
      @change="handleTabSwitch"
    >
      <VanTab title="帖子">
        <ul class="posts">
          <li
            v-for="item in source[0].list"
            :key="item.id"
            :class="[item.deleted_at ? 'deleted' : 'blue-link']"
            @click="toNativePage(item, 'post')"
            v-text="item.title"
          />
        </ul>
        <Loadmore
          :auto="false"
          :loading="source[0].loading"
          :no-more="source[0].noMore"
          :nothing="!source[0].list.length"
          :error="source[0].error"
          :fetch="loadMoreData"
        />
      </VanTab>
      <VanTab title="相册">
        <ul class="images">
          <li
            v-for="item in source[1].list"
            :key="item.id"
            @click="toNativePage(item, 'image')"
          >
            <VImg :src="item.url" :width="140" :height="180" />
            <div v-if="item.deleted_at" class="delete-mask">该相册已删除</div>
          </li>
        </ul>
        <Loadmore
          :auto="false"
          :loading="source[1].loading"
          :no-more="source[1].noMore"
          :nothing="!source[1].list.length"
          :error="source[1].error"
          :fetch="loadMoreData"
        />
      </VanTab>
      <VanTab title="漫评">
        <ul class="scores">
          <li
            v-for="item in source[2].list"
            :key="item.id"
            @click="toNativePage(item, 'review')"
          >
            <div
              :class="[item.deleted_at ? 'deleted' : 'blue-link']"
              v-text="item.title"
            />
            <p v-text="item.intro || '[图片]'" />
          </li>
        </ul>
        <Loadmore
          :auto="false"
          :loading="source[2].loading"
          :no-more="source[2].noMore"
          :nothing="!source[2].list.length"
          :error="source[2].error"
          :fetch="loadMoreData"
        />
      </VanTab>
      <VanTab title="视频">
        <ul class="videos">
          <li
            v-for="item in source[3].list"
            :key="item.id"
            @click="toNativePage(item, 'video')"
          >
            <div class="poster">
              <VImg :src="item.poster" :width="120" :height="80" />
              <div v-if="item.deleted_at" class="delete-mask">视频已失效</div>
            </div>
            <p class="name" v-text="item.name" />
          </li>
        </ul>
        <Loadmore
          :auto="false"
          :loading="source[3].loading"
          :no-more="source[3].noMore"
          :nothing="!source[3].list.length"
          :error="source[3].error"
          :fetch="loadMoreData"
        />
      </VanTab>
    </VanTabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import Api from '@/api/v1/selfApi'
import Loadmore from '@/components/Loadmore.vue'

export default {
  name: 'App',
  components: {
    VanTab: Tab,
    VanTabs: Tabs,
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
        type = 'score'
      } else if (index === 3) {
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
    },
    toNativePage(item, func) {
      if (item.deleted_at) {
        this.$toast.info('该内容已删除')
        return
      }
      this.$alias[func](item.id)
    }
  }
}
</script>
