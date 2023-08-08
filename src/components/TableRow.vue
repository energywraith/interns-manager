<script lang="ts">
export interface HeaderInterface {
  key: string
  label: string
  width: string
  component?: Component
}

export interface TableRowInterface {
  [key: string]: string | number
}

export interface ActionInterface {
  key: string
  icon: Component
  onclick: ((id: number) => void) | (() => void)
}
</script>

<script setup lang="ts">
import { type Component } from 'vue'

defineProps<{
  headers: HeaderInterface[]
  item: TableRowInterface
  actions: ActionInterface[]
}>()
</script>

<template>
  <tr>
    <td v-for="header in headers" :key="header.key" :style="{ width: header.width }">
      <component
        :is="header.component"
        :src="item[header.key]"
        v-if="header.component"
        small
      ></component>
      <span v-else>{{ item[header.key] }}</span>
    </td>
    <td>
      <div class="table-actions">
        <div v-for="action in actions" :key="action.key">
          <component
            :is="action.icon"
            :onclick="() => action.onclick(item.id as number)"
            class="action"
          ></component>
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped>
tr {
  height: 4rem;

  &:nth-of-type(2n) {
    background-color: #f8f8fa;
  }
}
.table-actions {
  display: flex;
  column-gap: 1rem;
  .action {
    cursor: pointer;
    fill: rgba(0, 0, 0, 0.3);

    &:hover {
      fill: #000;
    }
  }
}
</style>
