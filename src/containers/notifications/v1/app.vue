<style lang="scss">
#notifications {
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 35px;
    height: 76px;
    background-color: #fff;
    z-index: 2;

    button {
      float: right;
      height: 33px;
      line-height: 33px;
      margin-right: 15px;

      span {
        font-size: 15px;
        color: $color-text-light;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    h1 {
      color: $color-text-normal;
      font-size: 23px;
      line-height: 33px;
      margin-bottom: 8px;
      margin-left: 20px;
      overflow: hidden;
    }
  }

  .shim {
    height: 76px;
  }

  .list {
    position: relative;
    z-index: 1;
  }

  .system-notice {
    @extend %clearfix;
    padding-top: 12px;
    padding-left: $container-padding;

    &:active {
      background-color: $color-press-active;
    }

    .avatar {
      float: left;
      margin-right: $container-padding;

      img {
        width: 58px;
        height: 58px;
      }
    }

    .content {
      overflow: hidden;
      padding-right: $container-padding;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        background-color: $color-line;
        transform: scaleY(0.5);
      }

      .meta {
        float: right;
        margin-left: 10px;
        margin-top: 9px;

        time {
          color: $color-text-light;
          font-size: 12px;
          line-height: 17px;
          display: block;
        }

        span {
          position: absolute;
          right: 15px;
          bottom: 20px;
          display: block;
          font-size: 13px;
          color: #fff;
          border-radius: 50%;
          background-color: $color-red;
          text-align: center;
          width: 17px;
          height: 17px;
          line-height: 17px;
          float: right;
          text-indent: -1px;
        }
      }

      .body {
        overflow: hidden;

        header {
          margin-top: 8px;
          margin-bottom: 2px;
          font-size: 16px;

          .nickname {
            color: $color-link;
            line-height: 23px;
            font-weight: 500;
          }

          .intro {
            color: $color-text-normal;
            line-height: 23px;
          }
        }

        .about {
          font-size: 13px;
          line-height: 19px;
          color: $color-text-light;
          margin-bottom: 19px;
        }
      }
    }
  }
}
</style>

<template>
  <div id="notifications">
    <header class="header">
      <button @click.stop="clearNotification">
        <img src="../../../images/notification.png" /> <span>全部已读</span>
      </button>
      <h1>消息</h1>
    </header>
    <div class="shim" />
    <MtLoadmore
      ref="loadmore"
      :top-method="refreshPage"
      :auto-fill="false"
      :top-loading-text="''"
      top-pull-text="下拉刷新"
      top-drop-text="松开并刷新"
    >
      <div class="list">
        <div v-if="fetched" class="system-notice noti-item" @click="goToNotice">
          <div class="avatar">
            <img src="../../../images/system_notice.png" />
          </div>
          <div class="content">
            <div v-if="systemNotice.count" class="meta">
              <VTime v-model="systemNotice.created_at" />
              <span>{{ systemNotice.count }}</span>
            </div>
            <div class="body">
              <header>系统通知</header>
              <p class="about oneline">
                {{ systemNotice.count ? systemNotice.title : '暂无新消息通知' }}
              </p>
            </div>
          </div>
        </div>
        <CommonItem
          v-for="item in list"
          :key="item.id"
          :item="item"
          @read="handleMessageRead"
        />
      </div>
    </MtLoadmore>
    <VLoadmore
      :loading="loading"
      :no-more="noMore"
      :nothing="nothing"
      :error="error"
      :fetch="getData"
    />
  </div>
</template>

<script>
import Api from '@/api/v1/selfApi'
import CommonItem from '../components/Common.vue'
import VLoadmore from '@/components/Loadmore.vue'
import { Loadmore } from 'mint-ui'

export default {
  name: 'App',
  components: {
    CommonItem,
    VLoadmore,
    MtLoadmore: Loadmore
  },
  data() {
    return {
      list: [],
      total: 0,
      noMore: false,
      nothing: false,
      loading: false,
      error: false,
      fetched: false,
      systemNotice: {
        count: 0,
        id: 0,
        title: '',
        created_at: ''
      }
    }
  },
  methods: {
    async getData(refresh = false) {
      if (this.loading) {
        return
      }
      this.loading = true
      const api = new Api()
      const len = this.list.length
      try {
        const minId = refresh ? 0 : len ? this.list[len - 1].id : 0
        const data = await api.getNotifications({ minId })
        this.list = refresh ? data.list : this.list.concat(data.list)
        this.noMore = data.noMore
        this.nothing = !this.list.length
        if (!minId && data.system_count) {
          this.systemNotice.count = data.system_count
          this.systemNotice.id = data.lastest_notice.id
          this.systemNotice.title = data.lastest_notice.title
          this.systemNotice.created_at = data.lastest_notice.created_at
        }
      } catch (e) {
        this.$toast.error(e)
        this.error = true
      } finally {
        if (refresh) {
          this.$refs.loadmore.onTopLoaded()
        }
        this.fetched = true
        this.loading = false
      }
    },
    refreshPage() {
      this.getData(true)
    },
    handleMessageRead(id) {
      this.list.forEach(item => {
        if (item.id === id) {
          item.checked = true
          M.invoker.readNotification({
            count: 1
          })
        }
      })
    },
    clearNotification() {
      if (!this.list.filter(_ => !_.checked).length) {
        return
      }
      const api = new Api()
      api.readAllMessage()
      this.list.forEach(item => {
        item.checked = true
      })
      M.invoker.readNotification({
        count: -1
      })
    },
    goToNotice() {
      if (this.systemNotice.count) {
        const api = new Api()
        api.readNotice(this.systemNotice.id)
        this.systemNotice.count = 0
      }
      this.$alias.notice()
    }
  }
}
</script>
