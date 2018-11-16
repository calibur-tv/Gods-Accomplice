<style lang="scss">
.div-json-editor-container {
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
}
</style>

<template>
  <draggable
    v-model="content"
    :options="options"
    class="div-json-editor-container"
  >
    <component
      v-for="(item, index) in content"
      :index="index"
      :key="item.id"
      :item="item"
      :is="`${item.type}-item`"
      class="flip-list-item"
      @delete="handleDelete"
    />
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import TxtItem from "./items/TxtItem.vue";
import ImgItem from "./items/ImgItem.vue";
import UseItem from "./items/UseItem.vue";
import ListItem from "./items/ListItem.vue";
import { ulid } from "ulid";
import "./font.css";

export default {
  name: "JsonEditor",
  components: {
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
      })
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
  created() {},
  mounted() {},
  methods: {
    handleDelete({ id }) {
      console.log("delete", id);
    }
  }
};
</script>
