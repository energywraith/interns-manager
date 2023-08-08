import { type Ref } from 'vue'

export interface UserPostInput {
  first_name: string
  last_name: string
  avatar: string
}

export interface UserPutInput {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

export interface APIUser {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

export interface User extends APIUser {
  fullName: string
}

export type UsersInject =
  | {
      data: Ref<APIUser[]>
      onUserCreate: (input: UserPostInput) => Promise<void>
      onUserUpdate: (input: UserPutInput) => Promise<void>
      onUserDelete: (id: number) => Promise<void>
    }
  | undefined
