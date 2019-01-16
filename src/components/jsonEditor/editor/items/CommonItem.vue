<style lang="scss">
.editor-item-wrap {
  user-select: none;

  $editor-item-height: 76px;
  .editor-item {
    background-color: #fff;
    padding: $container-padding;
    @extend %clearfix;

    .poster {
      width: $editor-item-height;
      height: $editor-item-height;
      line-height: $editor-item-height;
      margin-right: $container-padding;
      text-align: center;
      float: left;

      .iconfont {
        font-size: 35px;
        color: #fff;
      }
    }

    .control {
      float: right;
      margin-left: $container-padding;

      .iconfont {
        display: block;
        color: $color-text-light;
        margin-bottom: 15px;
      }
    }

    .content {
      height: $editor-item-height;
      @include mutiline($editor-item-height / 4, 4);

      h3,
      p,
      span {
        font-size: 13px;
      }

      li {
        height: $editor-item-height / 4;
      }

      h3 {
        font-weight: bold;
      }

      .three-line {
        @include mutiline(19px, 3);
      }
    }
  }
}
</style>

<template>
  <div class="editor-item-wrap">
    <CreateBtn @create="emitCreateItem" />
    <div class="editor-item">
      <div class="poster"><slot name="poster"> poster </slot></div>
      <div class="control">
        <i class="iconfont ic-cancel" @click="emitDeleteItem" />
        <i class="iconfont ic-sort" @click="showSortToast" />
      </div>
      <div class="content"><slot name="content"> content </slot></div>
    </div>
  </div>
</template>

<script>
import CreateBtn from '../CreateBtn.vue'

export default {
  name: 'CommonItem',
  components: {
    CreateBtn
  },
  props: {
    id: {
      required: true,
      type: [Number, String]
    }
  },
  methods: {
    emitDeleteItem() {
      this.$channel.$emit('delete-editor-item', {
        id: this.id
      })
    },
    emitCreateItem({ type }) {
      this.$channel.$emit('create-editor-item', {
        id: this.id,
        type
      })
    },
    showSortToast() {
      this.$toast.info('长按并拖拽段落可以调整排序')
    }
  }
}
</script>
