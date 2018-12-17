<template>
  <StatsComponent :scale="2" @enter="init = true">
    <slot v-if="init" />
  </StatsComponent>
</template>

<script>
export default {
  name: 'VLazy',
  data() {
    return {
      init: false
    }
  }
}
</script>
