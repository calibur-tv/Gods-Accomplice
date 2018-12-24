<style lang="scss">
#notifications {
  height: 100%;

  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 18px;
    padding-bottom: 12px;
    height: 71px;
    background-color: #fff;
    z-index: 2;

    button {
      float: right;
      height: 33px;
      line-height: 33px;
      margin-right: 15px;

      span {
        font-size: 15px;
        color: #797989;
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

  .list {
    margin-top: 59px;
    position: relative;
    z-index: 1;
  }
}
</style>

<template>
  <div id="notifications">
    <MtLoadmore
      ref="loadmore"
      :top-method="refreshPage"
      :auto-fill="false"
      :top-loading-text="''"
      top-pull-text="下拉刷新"
      top-drop-text="松开并刷新"
    >
      <header class="header">
        <button @click.stop="clearNotification">
          <img src="../../../images/notification.png" /> <span>全部已读</span>
        </button>
        <h1>消息</h1>
      </header>
      <div class="list">
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
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      noMore: false,
      nothing: false,
      loading: false,
      error: false
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
        const data = await api.getNotifications({
          minId: refresh ? 0 : len ? this.list[len - 1].id : 0
        })
        this.list = refresh ? data.list : this.list.concat(data.list)
        this.noMore = data.noMore
        this.nothing = !this.list.length
      } catch (e) {
        this.$toast.error(e)
        this.error = true
      } finally {
        if (refresh) {
          this.$refs.loadmore.onTopLoaded()
        }
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
    }
  }
}
</script>
