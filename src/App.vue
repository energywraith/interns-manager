<script setup lang="ts">
import { provide } from 'vue'

import { useFetch } from '@/composables/fetch'
import type { UserPostInput, UserPutInput, APIUser } from '@/types'

const data = useFetch<APIUser[]>('https://reqres.in/api/users?page=1&per_page=50')

const onUserUpdate = async (input: UserPutInput) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${input.id}`, {
      method: 'PUT',
      body: JSON.stringify(input)
    })

    await response.json()

    data.value = data.value?.filter((user) => user.id !== input.id) || []

    data.value?.push(input)
  } catch (error) {
    alert(error)
  }
}

const onUserCreate = async (input: UserPostInput) => {
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      body: JSON.stringify(input)
    })

    const userResponse = await response.json()

    data.value?.push({
      ...input,
      id: +userResponse.id
    })
  } catch (error) {
    alert(error)
  }
}

const onUserDelete = async (id: number) => {
  try {
    await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE'
    })

    data.value = data.value?.filter((user) => user.id !== id) || []
  } catch (error) {
    alert(error)
  }
}

provide('users', {
  data,
  onUserDelete,
  onUserCreate,
  onUserUpdate
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
