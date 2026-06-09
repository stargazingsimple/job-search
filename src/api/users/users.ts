import { HTTP } from '@/api'
import type { User } from '@/api/users/types.ts'

export const userRegistration = async (payload: User, userId: string) => {
  return HTTP.post(`/users/${userId}.json`, payload)
}

export const getUserById = async (userId: string) => {
  return HTTP.get<User>(`/users/${userId}.json`)
}
