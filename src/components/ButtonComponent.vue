<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  icon?: Component
  rounded?: boolean
  variant?: 'solid' | 'ghost'
}>()

const variantWithDefault = props.variant || 'solid'
</script>

<template>
  <button
    :class="{
      rounded,
      solid: variantWithDefault === 'solid',
      ghost: variantWithDefault === 'ghost'
    }"
  >
    <Component :is="icon" v-if="icon" class="icon" />
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  border: none;
  outline: none;
  padding: 0.8rem 1.5rem;
  font-size: 1em;
  line-height: 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;

  &.solid {
    background: #459672;
    color: white;
    text-shadow: 0.3px 0.3px 3px #00000025;

    &:hover {
      background: #3b8162;
    }
  }

  &.ghost {
    background: transparent;
    border: 1px solid #00000075;
    color: #000000bb;

    &:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.411);
    }
  }

  &.rounded {
    border-radius: 24px;
  }

  .icon {
    margin-right: 0.5rem;
    width: 1rem;
  }
}
</style>
