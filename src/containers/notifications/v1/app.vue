<style lang="scss">
#notifications {
  min-height: 100vh;
}
</style>

<template>
  <MtLoadmore
    id="notifications"
    ref="loadmore"
    :top-method="refreshPage"
    :auto-fill="false"
    :top-loading-text="''"
    top-pull-text="下拉刷新"
    top-drop-text="松开并刷新"
  >
    <CommonItem v-for="item in list" :key="item.id" :item="item" />
    <VLoadmore
      :loading="loading"
      :no-more="noMore"
      :nothing="nothing"
      :error="error"
      :fetch="getData"
    />
  </MtLoadmore>
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
  computed: {},
  watch: {},
  created() {},
  mounted() {},
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
        this.list = this.list.concat(data.list)
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
    }
  }
}
</script>
