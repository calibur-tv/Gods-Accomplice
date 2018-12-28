<style lang="scss">
.trans-item {
  position: relative;
  padding: 20px 0;
  @extend %breakWord;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 1px;
    border-bottom: 1px solid #dddddd;
    transform: scale(0.5);
    transform-origin: 0 0;
  }

  a,
  button {
    color: $color-link;
  }

  .type {
    display: inline-block;
    margin-bottom: 5px;
    color: #333;
  }

  .amount {
    position: absolute;
    top: 20px;
    right: 0;
  }

  .minus {
    color: $color-red;
  }

  .plus {
    color: $color-link;
  }

  .detail {
    font-size: 14px;
    line-height: 1.7;
    color: #333;
  }

  .time,
  .state,
  .info {
    display: inline-block;
    font-size: 14px;
    color: #999999;
  }

  .time {
    margin-right: 5px;
  }

  .info {
    word-break: break-all;
  }
}
</style>

<template>
  <div class="trans-item">
    <div class="type" v-text="item.action" />
    <div :class="[item.type ? 'plus' : 'minus']" class="amount">
      {{ sign }}{{ item.count }}
    </div>
    <div class="detail"><slot /></div>
    <div class="time">{{ item.created_at }}</div>
  </div>
</template>

<script>
export default {
  name: 'TransDaySignNew',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  computed: {
    sign() {
      return this.item.type ? '+' : '-'
    }
  }
}
</script>
