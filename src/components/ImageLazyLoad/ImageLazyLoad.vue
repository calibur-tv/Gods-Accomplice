<style lang="scss" module>
$placeholder-color: RGB(241, 243, 244);

.inline {
  position: relative;
  overflow: hidden;
  display: inline-block;

  &.avatar {
    border-radius: 50%;
  }

  .image-wrap {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.block {
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: block;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  &.retry {
    cursor: pointer;

    img {
      display: none;
    }
  }

  // padding-top 用 js 来计算
  .padding-shim {
    background-color: $placeholder-color;
    width: 100%;
    height: 0;
  }

  // 因为需要 padding-shim 来撑起高度，所以这里只能绝对定位了
  .image-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.poster {
  border-radius: 10%;
}
</style>

<template>
  <!-- block 模式，主要是富文本中的图片 -->
  <div
    v-if="full"
    :class="[
      $style.block, // block 的默认样式
      {
        [$style.poster]: poster
      }
    ]"
    :style="blockModeWrapStyle"
  >
    <div
      :style="blockModeShimPadding"
      :class="$style.paddingShim"
    />
    <div :class="$style.imageWrap">
      <img :src="error ? errorPlaceholder : blockModeImageSrc">
    </div>
  </div>
  <!-- inline 模式，主要是用户头像、横排图 -->
  <span
    v-else
    :class="[
      $style.inline,
      {
        [$style.avatar]: avatar, // 如果图片类型是头像，就添加样式为圆形
        [$style.poster]: poster
      }
    ]"
    :style="inlineModeWrapStyle"
  >
    <div
      :class="$style.imageWrap"
      :style="{ backgroundImage: `url(${inlineModeImageSrc})` }"
    />
  </span>
</template>

<script>
export default {
  name: 'VImg',
  props: {
    src: {
      required: true,
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    full: {
      type: Boolean,
      default: false // 通过 full 参数来判断是做 inline 渲染还是 block 渲染
    },
    mime: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Boolean,
      default: false
    },
    poster: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: false,
      error: false,
      toggleClick: false,
      displayGifMask: false,
      retrying: false,
      containerWidth: 0,
      placeholderImage: '',
      errorPlaceholder: '',
      errorMessage: '',
      retryMessage: '',
      heightLimit: 0
    }
  },
  computed: {
    blockModeWrapStyle() {
      /**
       * block 模式下懒加载图片的容器宽高
       * block 模式下图片有两种一种是宽度 >= 父容器，一种是宽度 < 父容器
       * -----
       * 如果宽度小于父容器，那么图片是需要居中展示的，所以这里不能直接使用：width: 100%
       * 而是给一个具体的 px，然后通过 margin:0 auto 来居中
       * 如果宽度大于父容器，我们使用了 max-width: 100% 来让它不会超出父容器，也就是缩放了图片宽度
       * 图片的高度在 computeContainerHeight 已经缩放过了
       * -----
       * container 的高度通过一个内部元素的 padding 来撑起来
       */
      return {
        width: `${this.width}px`
      }
    },
    computeContainerHeight() {
      /**
       * 计算懒加载图片容器的高度
       * 如果是服务端，返回 0
       * 如果是客户端，根据图片宽度和父容器宽度进行计算
       * 图片宽度如果大于容器宽度，那么就要对高度进行缩放，否则直接返回图片高度
       */
      if (this.width > this.containerWidth) {
        return parseInt((this.height / this.width) * this.containerWidth, 10)
      }
      return this.height
    },
    blockModeShimPadding() {
      /**
       * block 模式下，在服务端无法获取父容器高度，因此要用 padding 来撑起懒加载区域
       */
      return {
        paddingTop: `${parseFloat(this.height / this.width).toFixed(3) * 100}%`
      }
    },
    inlineModeImageDisplayWidth() {
      /**
       * 计算要展示的图片的真实宽度，我们采用2倍图展示
       * 传入图片的宽度可能是数字、px、%
       * 如果是百分比，那么就根据父容器的宽度来计算一个展示宽度
       * 否则，就是传入宽度的2倍
       */
      const numberWidth = +this.width
        .toString()
        .replace('px', '')
        .replace('%', '')
      return parseInt(
        /%$/.test(this.width)
          ? (this.containerWidth / 50) * numberWidth
          : numberWidth * 2,
        10
      )
    },
    inlineModeWrapStyle() {
      /**
       * inline 模式下，传入的宽高值格式化后直接使用
       */
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    blockModeImageDisplaySize() {
      /**
       * 计算 block 模式下图片展示的宽高
       */
      let resultWidth
      let resultHeight
      if (this.width > this.containerWidth * 2) {
        resultWidth = this.containerWidth * 2
        resultHeight = this.computeContainerHeight * 2
      } else {
        resultWidth = this.width
        resultHeight = this.height
      }
      if (resultWidth > 9999) {
        resultHeight = parseInt((9999 / resultWidth) * resultHeight, 10)
        resultWidth = 9999
      }
      if (resultHeight > 9999) {
        resultWidth = parseInt((9999 / resultHeight) * resultWidth, 10)
        resultHeight = 9999
      }
      return {
        width: resultWidth,
        height: resultHeight
      }
    },
    blockModeImageSrc() {
      return this.$resize(this.src, this.blockModeImageDisplaySize)
    },
    inlineModeImageSrc() {
      return this.$resize(this.src, {
        width: this.inlineModeImageDisplayWidth,
        height: this.height * 2
      })
    }
  },
  mounted() {
    // 获取父容器的宽度，如果父容器有 padding，就会有 bug
    this.containerWidth = this.$el.parentNode.offsetWidth
    this.loaded = true
  }
}
</script>
