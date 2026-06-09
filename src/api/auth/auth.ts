import { AUTH } from '@/api'
import type { SignInData } from '@/api/auth/types.ts'

export const signIn = async ({ email, password }: SignInData) => {
  return await AUTH.post('/accounts:signInWithPassword', {
    email,
    password,
    returnSecureToken: true,
  })
}

export const signUp = async ({ email, password }: SignInData) => {
  return await AUTH.post('/accounts:signUp', {
    email,
    password,
    returnSecureToken: true,
  })
}
