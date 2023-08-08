<script setup lang="ts">
defineProps<{
  src?: string
  small?: boolean
}>()
</script>

<template>
  <div :class="{ empty: !src, small }">
    <img :src="src" v-if="src" />
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;

  &.small {
    width: 3rem;
    height: 3rem;
  }

  &.empty {
    background: #f8f8fa;
    padding: 24px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }
}

img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
</style>
