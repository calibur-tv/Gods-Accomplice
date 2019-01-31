<style lang="scss">
#trans-list {
  padding: 0 18px;

  a {
    vertical-align: middle;
  }
}
</style>

<template>
  <div id="trans-list">
    <Component
      :is="`Type-${item.type}`"
      v-for="(item, index) in list"
      :key="index"
      :item="item"
    />
    <Loadmore
      :loading="loading"
      :no-more="noMore"
      :nothing="!list.length"
      :error="error"
      :fetch="getData"
    />
  </div>
</template>

<script>
import Api from '@/api/v1/selfApi'
import Loadmore from '@/components/Loadmore.vue'
import Type0 from '../components/DaySign.vue'
import Type1 from '../components/InviteUser.vue'
import Type2 from '../components/ActivityGift.vue'
import Type3 from '../components/ManagerGift.vue'
import Type4 from '../components/RewardPost.vue'
import Type5 from '../components/RewardImage.vue'
import Type6 from '../components/RewardScore.vue'
import Type7 from '../components/RewardAnswer.vue'
import Type8 from '../components/RewardVideo.vue'
import Type9 from '../components/ForLover.vue'
import Type10 from '../components/Withdrawal.vue'
import Type11 from '../components/DeleteCreator.vue'
import Type12 from '../components/FreezeUser.vue'
import Type13 from '../components/SystemGift.vue'

export default {
  name: 'App',
  components: {
    Loadmore,
    Type0,
    Type1,
    Type2,
    Type3,
    Type4,
    Type5,
    Type6,
    Type7,
    Type8,
    Type9,
    Type10,
    Type11,
    Type12,
    Type13
  },
  data() {
    return {
      loading: false,
      noMore: false,
      error: false,
      page: 1,
      list: []
    }
  },
  methods: {
    async getData() {
      if (this.list.length < 20) {
        this.noMore = true
        return
      }
      if (this.loading) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        const data = await api.getTransactions({
          page: this.page,
          take: 20
        })
        this.list = this.list.concat(data.list)
        this.noMore = data.list.length < 20
        this.page++
      } catch (e) {
        this.$toast.error(e)
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
