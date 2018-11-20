<template>
  <span class="stats-comp">
    <slot/>
  </span>
</template>

<script>
import utils from '@/util/events.js'

export default {
  name: 'StatsComponent',
  props: {
    once: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      flag: false
    }
  },
  mounted() {
    this.checkViewed()
  },
  methods: {
    checkViewed() {
      if (this.once) {
        if (utils.checkInView(this.$el, 1)) {
          this.$emit('enter')
        } else {
          const id = utils.on(
            document,
            ['scroll'],
            utils.throttle(() => {
              if (utils.checkInView(this.$el, this.scale) || this.init) {
                this.$emit('enter')
                utils.off(id)
              }
            }, 250)
          )
        }
      } else {
        if (utils.checkInView(this.$el, 1)) {
          this.flag = true
          this.$emit('enter')
        } else {
          this.flag = false
        }
        utils.on(
          document,
          ['scroll'],
          utils.throttle(() => {
            if (utils.checkInView(this.$el, 1)) {
              if (!this.flag) {
                this.flag = true
                this.$emit('enter')
              }
            } else {
              if (this.flag) {
                this.flag = false
                this.$emit('leave')
              }
            }
          }, 250)
        )
      }
    }
  }
}
</script>
