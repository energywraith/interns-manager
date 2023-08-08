<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  pageCount: number
  onPageChange: (page: number) => void
}>()

const onPreviousPageClick = () => {
  if (props.currentPage === 0) {
    props.onPageChange(props.pageCount - 1)
    return
  }

  props.onPageChange(props.currentPage - 1)
}

const onNextPageClick = () => {
  if (props.currentPage === props.pageCount - 1) {
    props.onPageChange(0)
    return
  }

  props.onPageChange(props.currentPage + 1)
}
</script>

<template>
  <div class="table-paginator">
    <button :onclick="onPreviousPageClick">&lt;</button>
    <button
      v-for="page in pageCount"
      :key="page"
      :onclick="() => onPageChange(page - 1)"
      :class="{ active: page - 1 === currentPage }"
    >
      {{ page }}
    </button>
    <button :onclick="onNextPageClick">></button>
  </div>
</template>

<style scoped>
.table-paginator {
  display: flex;
}

button {
  background: var(--color-light-900);
  border: 1px solid var(--color-dark-100);
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  color: var(--color-green-900);

  &:hover {
    background: var(--color-dark-100);
  }

  &.active {
    border: 0;
    background: var(--color-green-900);
    color: var(--color-light-900);
  }
}
</style>
