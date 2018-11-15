<style lang="scss">
.json-item {
  position: relative;
  height: 110px;
  width: 100%;

  &.selected {
    .show-area {
      border-color: $color-pink-normal;
      box-shadow: 0 0 0 2px rgba($color-pink-normal, 0.2);
    }
  }

  .delete-btn {
    position: absolute;
    left: 56px;
    top: 18px;
    width: 40px;
    height: 40px;
    padding: 10px;
    text-align: center;
    color: #fff;
    font-size: 11px;
    line-height: 20px;

    span {
      display: block;
      width: 100%;
      height: 100%;
      background-color: #f56c6c;
      border-radius: 50%;
      opacity: 0.8;
    }
  }

  .up-btn {
    position: absolute;
    width: 40px;
    height: 40px;
    padding: 10px;
    right: -18px;
    top: -18px;
    line-height: 20px;

    span {
      display: block;
      width: 100%;
      height: 100%;
      background-color: $color-gray-light;
      border-radius: 50%;
      box-shadow: 0 0 0 1px $color-gray-normal;
      font-weight: bold;
      color: #333;
      font-size: 11px;
    }
  }

  .show-area {
    background-color: $color-gray-normal;
    border: 1px solid transparent;
    transition-duration: 0.3s;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

    .capture {
      float: left;
      width: 76px;
      height: 76px;
      margin-right: 10px;

      .poster {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }

      .default {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 76px;
        font-size: 30px;
        color: #fff;

        &.yellow {
          background-color: gold;
        }

        &.green {
          background-color: #67c23a;
        }

        &.blue {
          background-color: $color-blue-normal;
        }

        &.pink {
          background-color: $color-pink-deep;
        }
      }
    }

    .content {
      overflow: hidden;
      height: 76px;
      padding-top: 6px;
      padding-bottom: 6px;
      padding-right: 6px;

      .text {
        font-size: 13px;
        line-height: 16px;
        color: $color-text-normal;
        @extend %breakWord;

        &.line-4 {
          -webkit-line-clamp: 4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        &.line-3 {
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        &.oneline {
          font-weight: bold;
        }
      }

      ul li {
        list-style-type: disc;
      }

      ol li {
        list-style-type: decimal;
      }

      ul,
      ol {
        margin-left: 1.5em;
      }

      blockquote {
        border-left: 4px solid #d3d3d3;
        padding-left: 10px;
        margin-left: 5px;
      }
    }
  }

  .append-area {
    text-align: center;

    button {
      width: 50px;
      height: 30px;
      line-height: 20px;
      padding: 5px;
      margin: 0 3px;

      span {
        display: block;
        width: 100%;
        height: 100%;
        background-color: $color-gray-deep;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
      }

      i {
        font-weight: bold;
      }
    }
  }
}
</style>

<template>
  <div
    :class="[{ selected }, `json-item-${index}`]"
    class="json-item"
  >
    <button
      v-if="sectionCount > 1"
      class="delete-btn"
      @click="emitDelete"
    >
      <span>
        <i class="el-icon-delete"/>
      </span>
    </button>
    <button
      v-if="index"
      class="up-btn"
      @click="emitSort"
    >
      <span>
        <i class="el-icon-arrow-up"/>
      </span>
    </button>
    <div
      class="show-area"
      @click="emitPreview(item.type)"
    >
      <div class="capture">
        <template v-if="item.type === 'img'">
          <div
            v-if="item.url"
            :style="{ backgroundImage: `url(${$resize(item.url, { width: 150 })})` }"
            class="poster"
          />
          <div
            v-if="!item.url"
            class="default green"
          >
            <i class="el-icon-picture-outline"/>
          </div>
        </template>
        <div
          v-else-if="item.type === 'txt'"
          class="default yellow"
        >
          <i class="el-icon-edit-outline"/>
        </div>
        <div
          v-else-if="item.type === 'list'"
          class="default blue"
        >
          <i class="el-icon-tickets"/>
        </div>
        <div
          v-else-if="item.type === 'use'"
          class="default pink"
        >
          <i class="el-icon-service"/>
        </div>
      </div>
      <div class="content">
        <template v-if="item.type === 'txt'">
          <div
            v-if="item.text && !item.title"
            class="text line-4"
            v-html="item.text"
          />
          <div
            v-else-if="item.title && !item.text"
            class="text oneline"
            v-text="item.title"
          />
          <template
            v-else-if="item.title && item.text"
          >
            <div
              class="text oneline"
              v-text="item.title"
            />
            <div
              class="text line-3"
              v-html="item.text"
            />
          </template>
          <div
            v-else
            class="text"
          >点击添加文字</div>
        </template>
        <template
          v-else-if="item.type === 'img'"
        >
          <div
            v-if="item.text"
            class="text line-4"
            v-html="item.text"
          />
          <div
            v-else-if="item.url"
            class="text"
          >
            点击编辑图片
          </div>
          <div
            v-else
            class="text"
          >
            点击上传图片
          </div>
        </template>
        <template v-else-if="item.type === 'list'">
          <div
            v-if="item.text"
            class="text line-4"
          >
            <ol v-if="item.sort === '1'">
              <li
                v-for="(li, index) in computeList(item.text)"
                :key="index"
              >
                <span
                  class="oneline"
                  v-text="li"/>
              </li>
            </ol>
            <ul v-else>
              <li
                v-for="(li, index) in computeList(item.text)"
                :key="index"
              >
                <span
                  class="oneline"
                  v-text="li"/>
              </li>
            </ul>
          </div>
          <div
            v-else
            class="text"
          >点击添加列表</div>
        </template>
        <template v-else-if="item.type === 'use'">
          <blockquote
            v-if="item.text"
            class="text line-4"
            v-html="item.text"
          />
          <div
            v-else
            class="text"
          >点击添加引用内容</div>
        </template>
      </div>
    </div>
    <div class="append-area">
      <button @click="emitCreate('txt')">
        <span><i class="el-icon-edit-outline"/></span>
      </button>
      <button @click="emitCreate('img')">
        <span><i class="el-icon-picture"/></span>
      </button>
      <button @click="emitCreate('list')">
        <span><i class="el-icon-tickets"/></span>
      </button>
      <button @click="emitCreate('use')">
        <span><i class="el-icon-service"/></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "JsonItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true,
      default: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    sectionCount() {
      return this.$store.state.editor.sections.length;
    }
  },
  methods: {
    emitPreview(type) {
      this.$emit("preview", { index: this.index, type });
    },
    emitCreate(type) {
      this.$emit("create", { index: this.index, type });
    },
    emitDelete() {
      this.$emit("delete", { index: this.index });
    },
    emitSort() {
      this.$emit("sort", { index: this.index });
    },
    computeList(text) {
      let list = text;
      while (/\n\n/.test(list)) {
        list = list.replace(/\n\n/g, "\n");
      }
      return list.split("\n").slice(0, 4);
    }
  }
};
</script>
