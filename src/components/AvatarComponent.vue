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
    background: var(--color-light-600);
    padding: 24px;
    box-shadow: 0 0 3px var(--color-dark-300);
  }
}

img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
</style>
