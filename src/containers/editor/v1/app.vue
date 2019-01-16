<style lang="scss">
#json-editor {
  min-height: 100vh;
  background-color: RGB(241, 243, 244);
}
</style>

<template>
  <div id="json-editor"><JsonEditor v-model="content" /></div>
</template>

<script>
import JsonEditor from '@/components/jsonEditor/editor/index.vue'

export default {
  name: 'App',
  components: {
    JsonEditor
  },
  data() {
    return {
      id: 0,
      banner: null,
      content: []
    }
  }
}
</script>
