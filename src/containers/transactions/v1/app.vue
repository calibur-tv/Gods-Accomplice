<style lang="scss">
#trans-list {
  padding: 0 18px;
}
</style>

<template>
  <div id="trans-list">
    <Component
      :is="`Type-${item.action_type}`"
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
import Type0 from '../components/DaySignOld.vue'
import Type1 from '../components/RewardPost.vue'
import Type2 from '../components/InviteUser.vue'
import Type3 from '../components/ForLover.vue'
import Type4 from '../components/RewardImage.vue'
import Type5 from '../components/Withdrawal.vue'
import Type6 from '../components/RewardScore.vue'
import Type7 from '../components/RewardAnswer.vue'
import Type8 from '../components/DaySignNew.vue'
import Type9 from '../components/DeletePost.vue'
import Type10 from '../components/DeleteImage.vue'
import Type11 from '../components/DeleteScore.vue'
import Type12 from '../components/DeleteAnswer.vue'
import Type13 from '../components/RewardVideo.vue'
import Type14 from '../components/DeleteVideo.vue'
import Type15 from '../components/ActivityGift.vue'
import Type16 from '../components/ManagerGift.vue'

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
    Type13,
    Type14,
    Type15,
    Type16
  },
  data() {
    return {
      loading: false,
      noMore: false,
      error: false,
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
      const len = this.list.length
      try {
        const data = await api.getTransactions({
          min_id: len ? this.list[len - 1].id : 0
        })
        this.list = this.list.concat(data)
        this.noMore = !data.length
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
