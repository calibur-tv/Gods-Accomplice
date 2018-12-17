<style lang="scss">
.create-btn-wrap {
  text-align: center;
  opacity: 1;
  padding-top: 10px;
  padding-bottom: 10px;

  .btn {
    width: 20px;
    height: 20px;

    span {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      background-color: #ccd0d7;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}

.create-btn-popover {
  .row {
    font-size: 0;
    padding-bottom: 10px;
    padding-top: 5px;

    div {
      display: inline-block;
      width: 33.3%;

      span,
      i {
        display: block;
        text-align: center;
      }

      span {
        font-size: 12px;
      }
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #f6f6f6;
    }
  }
}
</style>

<template>
  <div class="create-btn-wrap">
    <VPopover
      v-model="trigger"
      width="200"
      trigger="manual"
      popper-class="create-btn-popover"
    >
      <div>
        <div class="row">
          <div @click="emitCreate('img')">
            <i class="iconfont ic-image" /> <span>图片</span>
          </div>
          <div @click="emitCreate('txt')">
            <i class="iconfont ic-text" /> <span>段落</span>
          </div>
          <div @click="emitCreate('use')">
            <i class="iconfont ic-use" /> <span>引用</span>
          </div>
        </div>
        <div class="row">
          <div @click="emitCreate('list')">
            <i class="iconfont ic-list" /> <span>列表</span>
          </div>
          <div @click="emitCreate('title')">
            <i class="iconfont ic-title" /> <span>小标题</span>
          </div>
          <div @click="emitCreate('divider')">
            <i class="iconfont ic-divider" /> <span>分割线</span>
          </div>
        </div>
      </div>
      <button slot="reference" class="btn" @click="trigger = true">
        <span>+</span>
      </button>
    </VPopover>
    <div v-if="trigger" class="mask" @click="trigger = false" />
  </div>
</template>

<script>
import { Popover } from 'element-ui'

export default {
  name: 'CreateBtn',
  components: {
    VPopover: Popover
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      trigger: this.value
    }
  },
  watch: {
    trigger(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.trigger = val
    }
  },
  methods: {
    emitCreate(type) {
      this.$emit('create', { type })
      this.trigger = false
    }
  }
}
</script>
