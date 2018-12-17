<style lang="scss">
.v-popover {
  padding: 0;
  border: none;

  ul {
    border-radius: 13px;
    overflow: hidden;

    li {
      position: relative;
      display: block;
      height: 40px;
      padding-left: 15px;
      line-height: 40px;
      font-size: 14px;

      &:not(:last-child) {
        &:after {
          content: '';
          position: absolute;
          background-color: #c8c7cc;
          display: block;
          z-index: 15;
          top: auto;
          right: auto;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 100%;
          transform-origin: 50% 100%;
          transform: scaleY(0.5);
        }
      }

      span {
        display: block;
      }

      i {
        float: right;
        margin-top: 13px;
        margin-right: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <span :class="className">
    <el-popover
      v-model="show"
      :width="width"
      trigger="click"
      popper-class="v-popover"
      @show="handleShow"
      @hide="handleHide"
    >
      <ul @click="handleClick">
        <li
          v-for="(item, index) in actionList"
          :key="index"
          @click="item.method"
        >
          <i class="el-icon-arrow-right"/>
          <span
            class="oneline"
            v-text="item.name"
          />
        </li>
      </ul>
      <slot slot="reference"/>
    </el-popover>
  </span>
</template>

<script>
import { Popover } from 'element-ui'

export default {
  name: 'VPopover',
  components: {
    'el-popover': Popover
  },
  props: {
    width: {
      type: Number,
      default: 240
    },
    actions: {
      type: Array,
      default: () => []
    },
    reportType: {
      type: String,
      default: ''
    },
    reportId: {
      type: Number,
      default: 0
    },
    reportText: {
      type: String,
      default: '举报'
    },
    isCreator: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    actionList() {
      const result = this.actions
      if (this.reportId) {
        result.push({
          name: this.reportText,
          method: () =>
            this.$channel.$emit('open-report-drawer', {
              id: this.reportId,
              model: this.reportType,
              title: this.reportText,
              isCreator: this.isCreator
            })
        })
      }
      return result
    }
  },
  methods: {
    handleShow() {
      this.$backdrop.show()
    },
    handleHide() {
      this.$backdrop.hide()
    },
    handleClick() {
      this.show = false
    }
  }
}
</script>
