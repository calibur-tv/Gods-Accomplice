<style lang="scss">
.noti-item {
  @extend %clearfix;
  margin: 15px 15px 0;
  padding-bottom: $container-padding;

  .avatar {
    float: left;
    margin-right: 15px;
  }

  .content {
    overflow: hidden;

    header {
      margin-top: 8px;
      margin-bottom: 6px;

      a {
        color: #22222b;
        font-size: 16px;
        line-height: 23px;
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
        :size="60"
        :user="item.user"
      />
      <slot
        v-else
        name="avatar"
      />
    </div>
    <div class="content">
      <header class="oneline">
        <a href="javascript:;">
          {{ item.user.nickname }}
        </a>
      </header>
      <!--
      <header
        class="title"
        v-html="item.message"
      />
      <footer>
        <v-time :datetime="item.created_at"/>
      </footer>
      -->
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
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
