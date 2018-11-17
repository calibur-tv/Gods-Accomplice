<style lang="scss">
#json-editor-container {
  width: 100%;
  background-color: RGB(241, 243, 244);

  .flip-list-move {
    transition: transform 0.5s;
  }

  .sortable {
    &-chosen {
      opacity: 1;

      .create-btn {
        opacity: 0;
      }
    }

    &-ghost {
      opacity: 0;
    }
  }

  .last-create-btn {
    padding-bottom: 165px;
  }
}
</style>

<template>
  <div id="json-editor-container">
    <draggable
      v-model="content"
      :options="options"
    >
      <component
        v-for="(item, index) in content"
        :index="index"
        :key="item.id"
        :item="item"
        :is="`${item.type}-item`"
        class="flip-list-item"
      />
    </draggable>
    <stats-component
      :once="false"
      @enter="handleCreateBtnEnter"
      @leave="handleCreateBtnLeave"
    >
      <create-btn
        v-model="showCreatePopover"
        class="last-create-btn"
      />
    </stats-component>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TxtItem from "./items/TxtItem.vue";
import ImgItem from "./items/ImgItem.vue";
import UseItem from "./items/UseItem.vue";
import ListItem from "./items/ListItem.vue";
import { ulid } from "ulid";
import "./font.css";
import CreateBtn from "./CreateBtn.vue";
import StatsComponent from "@/components/StatsComponent.vue";

export default {
  name: "JsonEditor",
  components: {
    StatsComponent,
    CreateBtn,
    draggable,
    TxtItem,
    ImgItem,
    UseItem,
    ListItem
  },
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      content: this.value.map(_ => {
        return Object.assign(_, {
          id: ulid()
        });
      }),
      showCreatePopover: false
    };
  },
  computed: {
    options() {
      return {
        delay: 500
      };
    }
  },
  watch: {
    content(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.content = val;
    }
  },
  created() {
    this.$channel.$on("delete-editor-item", this.handleDelete);
    this.$channel.$on("create-editor-item", this.handleCreate);
  },
  mounted() {},
  methods: {
    handleDelete({ id }) {
      this.$confirm("确定删除当前文章段落?")
        .then(() => {
          this.content.forEach((item, index) => {
            if (item.id === id) {
              this.content.splice(index, 1);
            }
          });
        })
        .catch(() => {});
    },
    handleCreate({ id, type }) {
      console.log("id", id);
      console.log("type", type);
    },
    handleCreateBtnEnter() {
      this.showCreatePopover = true;
    },
    handleCreateBtnLeave() {
      console.log("handleCreateBtnLeave");
      this.showCreatePopover = false;
    }
  }
};
</script>
