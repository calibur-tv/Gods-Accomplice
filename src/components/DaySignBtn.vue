<style lang="scss" module>
.btn {
  width: 78px;
  height: 36px;
  border-radius: 18px;
  background-color: $color-red;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
}
</style>

<template>
  <button :class="$style.btn" @click.stop="handleDaySign">
    {{ signed ? '已签到' : '签到' }}
  </button>
</template>

<script>
import Api from '@/api/v1/selfApi'

export default {
  name: 'DaySignBtn',
  props: {
    signed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleDaySign() {
      if (this.signed || this.loading) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        const result = await api.daySign()
        this.$emit('signed', result)
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
