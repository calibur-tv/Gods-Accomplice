<style lang="scss">
#trans-list {
  padding: 0 $container-padding;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    div {
      flex-grow: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }

    span,
    strong {
      vertical-align: middle;
    }

    .get {
      color: $color-red;
    }

    .set {
      color: $color-link;
    }
  }

  .main-hr {
    height: 10px;
    background-color: $color-background-container;
    margin-left: -$container-padding;
    margin-right: -$container-padding;
  }

  a {
    vertical-align: middle;
  }
}
</style>

<template>
  <div id="trans-list">
    <div class="header">
      <div>
        <span>收入：</span><strong class="get">{{ banlance.get }}</strong>
      </div>
      <div>
        <span>支出：</span><strong class="set">{{ banlance.set }}</strong>
      </div>
    </div>
    <div class="main-hr" />
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
import Type2 from '../components/ActivityCoinGift.vue'
import Type3 from '../components/ManagerCoinGift.vue'
import Type4 from '../components/RewardPost.vue'
import Type5 from '../components/RewardImage.vue'
import Type6 from '../components/RewardScore.vue'
import Type7 from '../components/RewardAnswer.vue'
import Type8 from '../components/RewardVideo.vue'
import Type9 from '../components/ForLover.vue'
import Type10 from '../components/Withdrawal.vue'
import Type11 from '../components/DeleteCreator.vue'
import Type12 from '../components/FreezeUser.vue'
import Type13 from '../components/SystemCoinGift.vue'
import Type14 from '../components/SystemLightGift.vue'
import Type15 from '../components/ActivityLightGift.vue'
import Type16 from '../components/ManagerLightGift.vue'
import Type17 from '../components/InviteByUser.vue'
import Type18 from '../components/BuyVideoPackage.vue'

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
    Type16,
    Type17,
    Type18
  },
  data() {
    return {
      loading: false,
      noMore: false,
      error: false,
      page: 1,
      list: [],
      banlance: {
        get: 0,
        set: 0
      }
    }
  },
  methods: {
    async getData() {
      if (!this.list.length) {
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
