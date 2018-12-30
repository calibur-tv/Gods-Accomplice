<style lang="scss" module>
$height: 50px;
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
    height: $height;
    line-height: 48px;

    div {
      display: inline-block;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 2px solid $color-red;
      border-bottom-color: transparent;
      vertical-align: middle;
      animation: rolling 0.8s infinite linear;
    }
  }

  .no-more {
    height: $height;
    line-height: $height;
  }

  .shim {
    height: $height;
  }

  .btn {
    width: 100%;
    display: block;
    height: $height;
    line-height: $height;
    font-size: 15px;
  }
}
</style>

<template>
  <div :class="$style.loadmore">
    <!-- loading -->
    <div v-if="loading">
      <slot name="loading">
        <div :class="$style.rolling"><div /></div>
      </slot>
    </div>
    <!-- nothing -->
    <div v-else-if="nothing">
      <slot name="nothing">
        <div :class="$style.nothing">
          <img
            :src="
              $resize('https://image.calibur.tv/owner/no-content', {
                width: 300
              })
            "
          />
          <p>还没有内容</p>
        </div>
      </slot>
    </div>
    <!-- noMore -->
    <div v-else-if="noMore">
      <slot name="no-more"> <p :class="$style.noMore">没有更多了~</p> </slot>
    </div>
    <!-- error -->
    <div v-else-if="error">
      <slot name="text">
        <button :class="$style.btn" @click="fetch" v-text="'点击重试'" />
      </slot>
    </div>
    <!-- 点击按钮 -->
    <div v-else>
      <slot name="text">
        <div v-if="auto" :class="$style.shim" />
        <button v-else :class="$style.btn" @click="fetch" v-text="text" />
      </slot>
    </div>
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
