<style lang="scss">
.bangumi-panel {
  background-color: #fff;
  padding: $container-padding;

  .tail {
    float: right;
    margin-left: $container-padding;
    margin-top: 12px;

    span {
      color: $color-red;
      font-size: 13px;
    }

    img {
      width: 15px;
      height: 15px;
    }
  }

  .content {
    overflow: hidden;

    .name {
      font-size: 17px;
      font-weight: 500;
      line-height: 24px;
      margin-bottom: 2px;
      color: $color-text-normal;
    }

    .intro {
      font-size: 12px;
      color: $color-text-light;
    }
  }
}
</style>

<template>
  <div class="bangumi-panel" @click.stop="$alias.bangumi(bangumi.id)">
    <div class="tail">
      <span>查看详情</span> <img src="../images/link-red.png" />
    </div>
    <div class="content">
      <p class="name oneline">{{ bangumi.name }}</p>
      <p class="intro oneline">{{ bangumi.summary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BangumiPanel',
  props: {
    bangumi: {
      type: Object,
      required: true
    }
  }
}
</script>
