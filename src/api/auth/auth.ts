import { AUTH } from '@/api'
import type { AuthData } from '@/api/auth/types.ts'

export const signIn = async ({ email, password }: AuthData) => {
  return await AUTH.post('/accounts:signInWithPassword', {
    email,
    password,
    returnSecureToken: true,
  })
}

export const signUp = async ({ email, password }: AuthData) => {
  return await AUTH.post('/accounts:signUp', {
    email,
    password,
    returnSecureToken: true,
  })
}
