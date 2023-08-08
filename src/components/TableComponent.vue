<script setup lang="ts">
import type { HeaderInterface, TableRowInterface, ActionInterface } from './TableRow.vue'
import TableRow from './TableRow.vue'

defineProps<{
  headers: HeaderInterface[]
  data?: TableRowInterface[]
  actions: ActionInterface[]
}>()
</script>

<template>
  <table>
    <tr>
      <th v-for="header in headers" :key="header.key">
        {{ header.label }}
      </th>
      <th>Action</th>
    </tr>
    <TableRow
      v-for="item in data"
      :key="item.id"
      :actions="actions"
      :item="item"
      :headers="headers"
    />
  </table>
</template>

<style scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
}
th {
  text-align: start;
  font-weight: 600;
}
</style>
