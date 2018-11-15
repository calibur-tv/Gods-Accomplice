<style lang="scss">
.list-preview {
  position: relative;
  z-index: 1;

  .sort-wrap {
    height: 40px;
    margin-left: 15px;
    margin-right: 15px;
    padding-bottom: 8px;
    margin-bottom: 10px;
    border-bottom: 1px solid $color-gray-light;

    span {
      line-height: 32px;
    }

    .mint-switch {
      margin-bottom: 0 !important;
      height: 32px !important;
      float: right;
    }
  }

  .content-wrap {
    position: relative;
    margin-bottom: 46px;
  }

  .shim,
  textarea {
    width: 100%;
    display: block;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0;
    padding-left: 15px;
    padding-right: 15px;
    @extend %breakWord;
  }

  .shim {
    height: auto;
    position: relative;
    visibility: hidden;
    white-space: pre-wrap;
    min-height: 300px;
  }

  textarea {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    border: none;
    resize: none;
    color: #333;
  }
}
</style>

<template>
  <v-drawer
    v-model="show"
    from="right"
    size="100%"
    header-text="编辑列表段落"
    submit-text="确定"
  >
    <div
      v-if="show"
      class="list-preview">
      <div class="sort-wrap">
        <span>顺序：{{ sort ? '有序' : '无序' }}</span>
        <mt-switch v-model="sort"/>
      </div>
      <div class="content-wrap">
        <pre
          class="shim"
          v-html="item.text"
        />
        <textarea
          v-model="text"
          placeholder="添加文字列表，回车分割"
          @focus="textAreaFocus"
        />
      </div>
    </div>
  </v-drawer>
</template>

<script>
import { Switch } from "mint-ui";

export default {
  name: "ListPreview",
  components: {
    "mt-switch": Switch
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      show: false,
      saving: false
    };
  },
  computed: {
    text: {
      get() {
        return this.item.text.replace(/<br>/g, "\n");
      },
      set(value) {
        this.$store.commit("editor/UPDATE_SECTION_TEXT", {
          value
        });
      }
    },
    sort: {
      get() {
        return this.item.sort === "1";
      },
      set(value) {
        this.$store.commit("editor/UPDATE_SECTION_SORT", {
          value: value ? "1" : "0"
        });
      }
    }
  },
  mounted() {
    this.$channel.$on("write-save-done", () => {
      this.saving = false;
    });
    this.$channel.$on("write-open-drawer", ({ type }) => {
      if (type === "list") {
        this.show = true;
      }
    });
  },
  methods: {
    textAreaFocus() {
      if (this.text.length < 100) {
        document.body.scrollTop = 0;
      }
    },
    emitSave() {
      if (!this.text.replace(/\n/g, "")) {
        return;
      }
      this.$channel.$emit("write-save");
      this.saving = true;
    }
  }
};
</script>
