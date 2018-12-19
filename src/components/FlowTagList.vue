<style lang="scss">
.flow-tag-list {
  margin-bottom: 20px;
  height: 25px;
  overflow: hidden;
  font-size: 0;
}
</style>

<template>
  <div class="flow-tag-list">
    <BubbleTag :text="bangumi.name" @click="$alias.bangumi(bangumi.id)">
      <img slot="icon" src="../images/bangumi-icon.png" />
    </BubbleTag>
    <BubbleTag v-for="item in tags" :key="item.id" :text="item.name" />
  </div>
</template>

<script>
import BubbleTag from '@/components/BubbleTag'

export default {
  name: 'FlowTagList',
  components: {
    BubbleTag
  },
  props: {
    bangumi: {
      required: true,
      type: Object
    },
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>
