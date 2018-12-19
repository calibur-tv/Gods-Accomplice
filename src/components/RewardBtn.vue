<style lang="scss" module>
.btn {
  border: 1px solid #ff6881;
  color: #ff6881;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 20px;
  height: 36px;
  line-height: 34px;
  border-radius: 18px;
}
</style>

<template>
  <button :class="$style.btn" @click.stop="handleReward">
    {{ rewarded ? '已投过食' : text }}
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
    rewarded: {
      type: Boolean,
      required: true
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
      this.$confirm('投食会消耗你1个团子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
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
          } catch (e) {
            this.$toast.error(e)
          } finally {
            this.loading = false
          }
        })
        .catch(() => {})
    }
  }
}
</script>
