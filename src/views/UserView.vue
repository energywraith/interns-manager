<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import AvatarComponent from '@/components/AvatarComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ShadowCard from '@/components/ShadowCard.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import type { APIUser, UsersInject } from '@/types'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const usersInject: UsersInject = inject('users')
const userId = route.params.id
const isEdit = !!userId

const user = computed(() => {
  if (!isEdit || !usersInject?.data.value || !userId) return null

  return usersInject.data.value.find((user: APIUser) => {
    return user.id === +userId
  })
})

const firstName = ref(user.value?.first_name || '')
const lastName = ref(user.value?.last_name || '')
const avatar = ref(user.value?.avatar || '')

const onUserCreateHandle = async (e: SubmitEvent) => {
  e.preventDefault()

  if (isEdit && userId) {
    await usersInject?.onUserUpdate({
      id: +userId,
      first_name: firstName.value,
      last_name: lastName.value,
      avatar: avatar.value
    })
  } else {
    await usersInject?.onUserCreate({
      first_name: firstName.value,
      last_name: lastName.value,
      avatar: avatar.value
    })
  }

  router.push({ path: '/' })
}

const onAvatarAdd = () => {
  const avatarLink = prompt('Please enter avatar link', 'https://reqres.in/img/faces/1-image.jpg')

  if (!avatarLink) {
    return
  }

  avatar.value = avatarLink
}
</script>

<template>
  <form :onsubmit="onUserCreateHandle">
    <main>
      <h1>Add user</h1>
      <ShadowCard class="name-card">
        <InputComponent
          v-model="firstName"
          placeholder="Enter first name"
          label="First Name"
          required
        />
        <InputComponent
          v-model="lastName"
          placeholder="Enter last name"
          label="Last Name"
          required
        />
        <ButtonComponent class="name-card__button" type="submit">Update Details</ButtonComponent>
      </ShadowCard>
      <ShadowCard class="avatar-card">
        <AvatarComponent class="avatar-card__avatar" :src="avatar" />
        <ButtonComponent
          :onclick="onAvatarAdd"
          :icon="IconCamera"
          type="button"
          class="avatar-card__button"
          variant="ghost"
          >Change Photo</ButtonComponent
        >
      </ShadowCard>
    </main>
  </form>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    grid-column: 1/3;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    justify-content: space-between;
  }
}

.name-card {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  order: 2;

  &__button {
    align-self: stretch;
    width: 100%;
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    padding-top: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    order: 1;

    &__button {
      align-self: flex-end;
    }
  }
}

.avatar-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 6rem;
  padding-top: 4rem;
  order: 1;

  @media (min-width: 768px) {
    order: 2;
  }

  &__avatar {
    height: 10rem;
    width: 10rem;
  }

  &__button {
    justify-self: flex-end;
    width: 100%;
  }
}
</style>
