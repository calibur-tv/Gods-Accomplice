<style lang="scss" module>
.btn {
  border: 1px solid $color-red;
  color: $color-red;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 20px;
  height: 36px;
  line-height: 34px;
  border-radius: 18px;

  &.active {
    color: $color-text-light;
    border-color: $color-line;
  }
}
</style>

<template>
  <button
    :class="[$style.btn, { [$style.active]: rewarded }]"
    @click.stop="handleReward"
  >
    {{ rewarded ? rewardedText : text }}
  </button>
</template>

<script>
import Api from '@/api/v1/toggleApi'

export default {
  name: 'RewardBtn',
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      default: '为TA投食'
    },
    rewardedText: {
      type: String,
      default: '已投过食'
    },
    rewarded: {
      type: Boolean,
      required: true
    },
    confirm: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    M.channel.$on('app-invoker-toggleClick', ({ type, model, id }) => {
      if (model === this.type && type === 'reward' && id === this.id) {
        this.$emit('reward')
      }
    })
  },
  methods: {
    handleReward() {
      if (this.loading || this.rewarded) {
        return
      }
      if (this.confirm) {
        M.invoker.confirm({
          message: '投食会消耗你1个团子, 是否继续?',
          callback: this.submit
        })
      } else {
        this.submit()
      }
    },
    async submit() {
      this.loading = true
      const api = new Api()
      try {
        await api.reward({
          type: this.type,
          id: this.id
        })
        this.$emit('reward')
        M.invoker.toggleClick({
          type: 'reward',
          model: this.type,
          id: this.id,
          result: {
            rewarded: true
          }
        })
        M.invoker.getUserInfo(user => {
          user.coin--
          M.invoker.setUserInfo(user)
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
