<style lang="scss">
.switcher {
  height: 24px;
  padding: 2px;
  border-radius: 22px;
  background-color: $color-background-tag;
  display: inline-block;
  font-size: 0;

  button {
    color: $color-text-light;
    height: 20px;
    line-height: 20px;
    padding: 0 7px;
    text-align: center;
    border-radius: 10px;
    background-color: transparent;
    font-size: 12px;

    &:not(:last-child) {
      margin-right: 1px;
    }

    &.is-active {
      color: #484853;
      background-color: #fff;
    }
  }
}
</style>

<template>
  <div class="switcher">
    <button
      v-for="(item, index) in list"
      :key="index"
      :class="{ 'is-active': selectedIndex === index }"
      @click="handleClick(index)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Switcher',
  props: {
    list: {
      required: true,
      type: Array
    },
    defIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedIndex: +this.defIndex
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(index) {
      if (this.selectedIndex === index) {
        return
      }
      this.selectedIndex = index
      this.$emit('click', index)
    }
  }
}
</script>
