<style lang="scss">
.noti-item {
  @extend %clearfix;
  margin: $container-padding $container-padding 0;
  padding-bottom: $container-padding;
  border-bottom: 1px solid #eee;

  .avatar {
    float: left;
    margin-right: $container-padding;
  }

  .content {
    overflow: hidden;

    header {
      margin-bottom: 10px;
      font-size: 14px;

      a {
        color: $color-pink;
        margin-left: 3px;
        margin-right: 3px;
      }
    }

    footer {
      font-size: 12px;
      color: $color-gray-text;
    }
  }
}
</style>

<template>
  <div class="noti-item">
    <div class="avatar">
      <user-avatar
        v-if="item.user"
        :user="item.user"
      />
      <slot
        v-else
        name="avatar"
      />
    </div>
    <div class="content">
      <header
        class="title"
        v-html="item.message"
      />
      <footer>
        <v-time :datetime="item.created_at"/>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
