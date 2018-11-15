<style lang="scss">
.json-editor-main {
  margin-bottom: 30px;

  .editor-tabs {
    position: relative;
  }

  .list-complete-item {
    transition: all 0.5s;
  }

  .list-complete-enter,
  .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }
}
</style>

<template>
  <div class="json-editor-main">
    <transition-group
      name="list-complete"
      tag="div"
      class="editor-tabs"
    >
      <json-item
        v-for="(item, index) in sections"
        :key="item.id"
        :item="item"
        :index="index"
        :selected="index === selectedIndex"
        class="list-complete-item"
        @preview="handleItemPreview"
        @create="handleItemAppend"
        @delete="handleItemDelete"
        @sort="handleItemSort"
      />
    </transition-group>
    <img-preview :item="curPreview"/>
    <txt-preview :item="curPreview"/>
    <list-preview :item="curPreview"/>
    <use-preview :item="curPreview"/>
  </div>
</template>

<script>
import JsonItem from "./JsonItem";
import ImgPreview from "./preview/ImgPreview";
import TxtPreview from "./preview/TxtPreview";
import ListPreview from "./preview/ListPreview";
import UsePreview from "./preview/UsePreview";
import scrollToY from "~/assets/js/scrollToY";

export default {
  name: "JsonEditorMain",
  components: {
    JsonItem,
    ImgPreview,
    TxtPreview,
    ListPreview,
    UsePreview
  },
  computed: {
    id() {
      return +(this.$route.params.id || 0);
    },
    sections() {
      return this.$store.state.editor.sections;
    },
    selectedIndex() {
      return this.$store.state.editor.selectedIndex;
    },
    curPreview() {
      return this.selectedIndex >= 0 ? this.sections[this.selectedIndex] : {};
    }
  },
  mounted() {
    this.$channel.$on("write-save", () => {
      const richContent = this.getRichContent();
      if (!richContent.length) {
        this.$toast.info("内容不能为空！");
        return;
      }
      this.$emit("submit", {
        content: richContent,
        desc: this.getPureContent(),
        publish: false,
        id: this.id
      });
    });
    this.$channel.$on("write-publish", () => {
      const richContent = this.getRichContent();
      if (!richContent.length) {
        this.$toast.info("内容不能为空！");
        return;
      }
      this.$emit("submit", {
        content: richContent,
        desc: this.getPureContent(),
        publish: true,
        id: this.id
      });
    });
  },
  methods: {
    getRichContent() {
      const result = [];
      this.sections.forEach(item => {
        if (item.type === "img") {
          if (item.url) {
            result.push(item);
          }
        } else if (item.type === "txt") {
          if (item.title || item.text) {
            result.push(item);
          }
        } else if (item.type === "use") {
          if (item.text) {
            result.push(item);
          }
        } else if (item.type === "list") {
          if (item.text) {
            result.push(item);
          }
        }
      });
      return result;
    },
    getPureContent() {
      let result = "";
      this.sections.forEach(item => {
        if (item.type === "txt" && item.title) {
          result += `${item.title}，`;
        }
        if (item.type === "txt" && item.text) {
          result += item.text.replace(/<br>/g, "\n");
        }
        if (item.type === "use" && item.text) {
          result += item.text.replace(/<br>/g, "\n");
        }
        if (item.type === "list" && item.text) {
          let list = item.text;
          while (/\n\n/.test(list)) {
            list = list.replace(/\n\n/g, "\n");
          }
          result += list.replace(/\n/g, ";");
        }
      });
      return result;
    },
    handleItemPreview({ index, type }) {
      this.$store.commit("editor/SWITCH_SECTION", { index });
      this.$channel.$emit("write-open-drawer", { type });
    },
    handleItemAppend({ index, type }) {
      this.$store.commit("editor/APPEND_SECTION", { index, type });
      this.scrollToBottom(index);
    },
    handleItemDelete({ index }) {
      this.$store.commit("editor/DELETE_SECTION", { index });
    },
    handleItemSort({ index }) {
      this.$store.commit("editor/SORT_SECTION", { index });
    },
    scrollToBottom(index) {
      this.$nextTick(() => {
        if (index === this.sections.length - 2) {
          const dom = document.querySelector(`.json-item-${index}`);
          scrollToY(
            dom ? this.$utils.getOffsetTop(dom) + 300 : index * 300 + 1000,
            1000,
            document.getElementById("layout-write")
          );
        }
      });
    }
  }
};
</script>
