<style lang="scss">
p {
  color: $color-pink;
}
</style>

<template>
  <div>
    <p>hello world</p>
    <img
      src="@/images/logo.png"
      width="300"
      height="300"
    >
  </div>
</template>

<script>
import Api from "@/api/v1/selfApi";

export default {
  name: "App",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    async getData() {
      const api = new Api();
      const len = this.list.length;
      try {
        const data = await api.getTransactions({
          min_id: len ? this.list[len - 1].id : 0
        });
        this.list = this.list.concat(data);
      } catch (e) {
        this.$toast.error(e);
      }
    }
  }
};
</script>
