<template>
  <div class="json-content">
    <component
      v-for="(item, index) in content"
      :key="index"
      :item="item"
      :is="`${item.type}-parser`"
    />
  </div>
</template>

<script>
import TxtParser from "./TxtParser";
import ImgParser from "./ImgParser";
import UseParser from "./UseParser";
import ListParser from "./ListParser";

export default {
  name: "JsonContent",
  components: {
    TxtParser,
    ImgParser,
    UseParser,
    ListParser
  },
  props: {
    content: {
      required: true,
      type: Array
    }
  }
};
</script>
