<script setup lang="ts">
defineProps<{
  placeholder: string
  modelValue: string
  withSearchIcon?: boolean
  withBackground?: boolean
  label?: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div
    :class="{
      'with-search-icon': withSearchIcon
    }"
  >
    <label v-if="label">{{ label }}</label>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      :class="{
        'with-background': withBackground
      }"
    />
  </div>
</template>

<style scoped lang="scss">
div {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  border-radius: 4px;

  &.with-search-icon {
    width: fit-content;
    height: fit-content;

    input {
      padding-right: 30px;
    }

    &::before {
      content: '';
      background: url('src/assets/search.svg') no-repeat 96% center;
      background-size: 1em;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1em;
      height: 1em;
      position: absolute;
      pointer-events: none;
    }
  }
}

input {
  height: 1rem;
  padding: 1rem 0.5rem;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 1px var(--color-dark-800);
  font-weight: 600;
  width: 100%;

  &.with-background {
    background: var(--color-light-600);
  }
}

label {
  font-size: 0.8em;
  font-weight: 700;
}
</style>
