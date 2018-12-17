<style lang="scss" module>
.loadmore {
  text-align: center;

  .nothing {
    img {
      width: 160px;
      height: auto;
      display: block;
      margin: 20px auto;
    }

    p {
      font-size: 12px;
    }
  }

  .rolling {
    height: 50px;
    line-height: 48px;

    div {
      display: inline-block;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 2px solid #ccd0d7;
      border-bottom-color: transparent;
      vertical-align: middle;
      animation: rolling 0.8s infinite linear;
    }
  }

  .btn {
    width: 100%;
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
  }
}
</style>

<template>
  <div :class="$style.loadmore">
    <!-- loading -->
    <slot v-if="loading" name="loading">
      <div :class="$style.rolling"><div /></div>
    </slot>
    <!-- nothing -->
    <slot v-else-if="nothing" name="nothing">
      <div :class="$style.nothing">
        <img
          :src="
            $resize('https://image.calibur.tv/owner/no-content', { width: 300 })
          "
        />
        <p>还没有内容</p>
      </div>
    </slot>
    <!-- noMore -->
    <slot v-else-if="noMore" name="no-more"> 没有更多了~ </slot>
    <!-- error -->
    <slot v-else-if="error" name="text">
      <button :class="$style.btn" @click="fetch" v-text="'点击重试'" />
    </slot>
    <!-- 点击按钮 -->
    <slot v-else-if="!auto" name="text">
      <button :class="$style.btn" @click="fetch" v-text="text" />
    </slot>
  </div>
</template>

<script>
import Utils from '@/util/events.js'

export default {
  name: 'Loadmore',
  props: {
    auto: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    noMore: {
      type: Boolean,
      default: false
    },
    nothing: {
      type: Boolean,
      default: false
    },
    fetch: {
      type: Function,
      required: true
    },
    text: {
      type: String,
      default: '点击加载更多'
    }
  },
  mounted() {
    if (this.auto) {
      this.onScroll()
    }
  },
  methods: {
    onScroll() {
      if (Utils.checkInView(this.$el)) {
        this.fetch()
      }
      const id = Utils.on(
        document,
        ['scroll'],
        Utils.throttle(() => {
          if (this.error) {
            return
          }
          if (this.noMore || !this.auto) {
            Utils.off(id)
            return
          }
          if (Utils.checkInView(this.$el)) {
            this.fetch()
          }
        }, 200)
      )
    }
  }
}
</script>
