<style lang="scss">
.text-preview {
  position: relative;
  z-index: 1;

  input {
    width: 100%;
    height: 40px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid $color-gray-light;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
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
    header-text="编辑文本段落"
    submit-text="确定"
  >
    <div 
      v-if="show" 
      class="text-preview">
      <input
        v-model="title"
        type="text"
        placeholder="段落小标题"
        maxlength="20"
      >
      <div class="content-wrap">
        <pre
          class="shim"
          v-html="item.text"
        />
        <textarea
          v-model="text"
          placeholder="添加文字内容"
          @focus="textAreaFocus"
        />
      </div>
    </div>
  </v-drawer>
</template>

<script>
export default {
  name: "TxtPreview",
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
          value: value.replace(/\n/g, "<br>")
        });
      }
    },
    title: {
      get() {
        return this.item.title;
      },
      set(value) {
        this.$store.commit("editor/UPDATE_SECTION_TITLE", {
          value
        });
      }
    }
  },
  mounted() {
    this.$channel.$on("write-save-done", () => {
      this.saving = false;
    });
    this.$channel.$on("write-open-drawer", ({ type }) => {
      if (type === "txt") {
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
