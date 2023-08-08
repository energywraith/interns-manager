import type { User } from '@/types'

export const filterUsersByName = (data: User[], key: string) => {
  if (key.length === 0) {
    return data
  }

  return data.filter((user) => user.fullName.toLowerCase().includes(key.toLowerCase()))
}
