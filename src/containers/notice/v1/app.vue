<style lang="scss">
#notice {
  min-height: 100vh;
  -webkit-overflow-scrolling: touch;
  padding-top: 12px;
  padding-bottom: 30px;
  background-color: $color-background-container;

  li {
    list-style-type: none;
    margin-bottom: 10px;
    display: block;
    margin-left: 12px;
    margin-right: 12px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    padding: 12px;

    header {
      margin-bottom: 15px;

      .user {
        overflow: hidden;
        font-size: 14px;
        color: $color-text-normal;

        .avatar {
          border-radius: 50%;
          margin-right: 2px;
        }
      }

      time {
        float: right;
        font-size: 12px;
        color: $color-text-light;
      }
    }

    main {
      background-color: $color-background-tag;
      height: 80px;
      border-radius: 10px;
      padding: 15px 12px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 15px;

      .banner {
        width: 50px;
        height: 50px;
        border-radius: 4px;
        margin-right: 12px;
      }

      .title {
        overflow: hidden;
        font-size: 17px;
        color: $color-text-normal;
        font-weight: 500;
        @include mutiline(22px);
      }
    }

    footer {
      button {
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: $color-red;

        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>

<template>
  <ul id="notice">
    <li
      v-for="(item, index) in list"
      :key="index"
      @click="$alias.open(`notice/${item.id}`)"
    >
      <header>
        <VTime v-model="item.created_at" />
        <div class="user">
          <img :src="$resize(item.user.avatar, { width: 20 })" class="avatar" />
          <span class="nickname" v-text="item.user.nickname" />
          <span>发了新通知</span>
        </div>
      </header>
      <main>
        <img :src="$resize(item.banner, { width: 100 })" class="banner" />
        <div class="title" v-text="item.title" />
      </main>
      <footer>
        <button>
          <span>查看详情</span> <img src="../../../images/link-red.png" />
        </button>
      </footer>
    </li>
    <Loadmore
      :loading="loading"
      :no-more="noMore"
      :nothing="nothing"
      :error="error"
      :fetch="getData"
    />
  </ul>
</template>

<script>
import Api from '@/api/v1/selfApi'
import Loadmore from '@/components/Loadmore.vue'

export default {
  name: 'App',
  components: {
    Loadmore
  },
  data() {
    return {
      loading: false,
      error: false,
      nothing: false,
      noMore: false,
      list: []
    }
  },
  methods: {
    async getData() {
      if (this.loading) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        const data = await api.systemNotice()
        this.list = data
        if (!data.length) {
          this.nothing = true
        }
      } finally {
        // 只有一页
        this.noMore = true
        this.loading = false
      }
    }
  }
}
</script>
