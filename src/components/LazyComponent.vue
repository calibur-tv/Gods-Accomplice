<template>
  <stats-component @enter="init = true">
    <slot v-if="init"/>
  </stats-component>
</template>

<script>
export default {
  name: 'VLazy'
}
</script>
