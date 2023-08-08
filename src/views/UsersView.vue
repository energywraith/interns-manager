<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import AvatarComponent from '@/components/AvatarComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ShadowCard from '@/components/ShadowCard.vue'
import TableComponent from '@/components/TableComponent.vue'
import TablePaginator from '@/components/TablePaginator.vue'
import IconBin from '@/components/icons/IconBin.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { splitIntoChunks } from '@/helpers/splitIntoChunks'
import { noop } from '@/helpers/noop'
import { filterUsersByName } from '@/helpers/filterUsersByName'
import type { User, UsersInject } from '@/types'
import type { TableRowInterface } from '@/components/TableRow.vue'

const usersInject: UsersInject = inject('users')
const router = useRouter()

const searchKey = ref('')
const page = ref(0)
const perPage = 8

const headers = [
  {
    key: 'avatar',
    label: 'Avatar',
    width: '20%',
    component: AvatarComponent
  },
  {
    key: 'fullName',
    label: 'Full Name',
    width: '70%'
  }
]

const actions = [
  {
    key: 'edit',
    icon: IconEdit,
    onclick: (id: number) => {
      router.push({ path: `/user/${id}` })
    }
  },
  {
    key: 'delete',
    icon: IconBin,
    onclick: usersInject?.onUserDelete || noop
  }
]

const users = computed(() => {
  const newData = usersInject?.data?.value

  if (!newData) {
    return []
  }

  const usersParsed = newData.map((user) => ({
    ...user,
    id: user.id,
    fullName: `${user.first_name} ${user.last_name}`,
    avatar: user.avatar
  }))

  return splitIntoChunks<User>(filterUsersByName(usersParsed, searchKey.value), perPage)
})

const usersOnCurrentPage = computed(() => {
  return users.value[page.value] as unknown as TableRowInterface[]
})

const pageCount = computed(() => {
  return users.value.length
})

const onPageChange = (newPage: number) => {
  page.value = newPage
}

watch(usersOnCurrentPage, () => {
  if (!usersOnCurrentPage.value && page.value !== 0) {
    onPageChange(page.value - 1)
  }
})
</script>

<template>
  <main>
    <h1>User list</h1>
    <ShadowCard class="table-card">
      <InputComponent
        v-model="searchKey"
        placeholder="Search for users..."
        class="search-input"
        withSearchIcon
        withBackground
      />
      <ButtonComponent rounded :icon="IconPlus" :onclick="() => $router.push({ path: '/user' })"
        >Add User</ButtonComponent
      >
      <div class="divider" />
      <TableComponent
        v-if="users"
        class="table"
        :headers="headers"
        :data="usersOnCurrentPage"
        :actions="actions"
      />
    </ShadowCard>
    <TablePaginator :currentPage="page" :pageCount="pageCount" :onPageChange="onPageChange" />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    align-items: stretch;
  }
}
.table-card {
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  column-gap: 1rem;

  .search-input {
    max-width: 24rem;
    width: 100%;
    align-self: center;
    background: var(--color-light-600);
  }

  .divider {
    background: var(--color-dark-100);
    height: 1px;
    width: 100%;
    grid-column: 1/3;
    margin: 1rem 0;
  }

  .table {
    grid-column: 1/3;
  }
}
</style>
