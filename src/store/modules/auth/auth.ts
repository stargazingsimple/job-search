import { defineStore } from 'pinia'
import { signIn, signUp } from '@/api/auth/auth.ts'
import { getUserById, userRegistration } from '@/api/users/users.ts'
import { useToast } from 'vue-toastification'
import { HIDE_LOADER, SHOW_LOADER, useLoaderStore } from '@/store/modules/loader/loader.ts'
import type { AuthData } from '@/api/auth/types.ts'
import type { User } from '@/api/users/types.ts'

interface AuthState {
  localId: string | null
  idToken: string | null
  userData: User | null
}

const toast = useToast()
const loader = useLoaderStore()

let timer: ReturnType<typeof setTimeout>

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      localId: null,
      idToken: null,
      userData: null,
    }
  },
  actions: {
    setUser({ idToken, localId, userData }: AuthState) {
      this.localId = localId
      this.idToken = idToken
      this.userData = userData
    },
    async signIn(payload: AuthData) {
      loader[SHOW_LOADER]()
      try {
        const { data } = await signIn(payload)
        const res = await getUserById(data.localId)

        if (!res) return

        if (!res.data) {
          throw new Error('User not found in the database')
        }

        const userData = Object.values(res.data)[0]

        const expiresIn = +data.expiresIn * 1000
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem('idToken', data.idToken)
        localStorage.setItem('localId', data.localId)
        localStorage.setItem('expirationDate', `${expirationDate}`)
        localStorage.setItem('userData', JSON.stringify(userData))

        timer = setTimeout(() => {
          this.signOut()
        }, expiresIn)

        this.setUser({
          idToken: data.idToken,
          localId: data.localId,
          userData,
        })

        return true
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        loader[HIDE_LOADER]()
      }
    },
    async signUp(payload: AuthData) {
      loader[SHOW_LOADER]()
      try {
        const { data } = await signUp(payload)

        delete payload.password

        const res = await userRegistration(payload as User, data.localId)

        if (!res) return

        toast.success('Registration successful!')
        return true
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        loader[HIDE_LOADER]()
      }
    },
    signOut() {
      localStorage.removeItem('idToken')
      localStorage.removeItem('localId')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('userData')

      clearTimeout(timer)

      this.setUser({
        idToken: null,
        localId: null,
        userData: null,
      })
    },
    autologin() {
      const idToken = localStorage.getItem('idToken')
      const localId = localStorage.getItem('localId')
      const tokenExpirationDate = localStorage.getItem('expirationDate')
      const userData = localStorage.getItem('userData')

      if (!tokenExpirationDate || !userData) return

      const expiresIn = +tokenExpirationDate - new Date().getTime()

      if (expiresIn < 0) return

      timer = setTimeout(() => {
        this.signOut()
      }, expiresIn)

      if (idToken && localId) {
        this.setUser({
          idToken,
          localId,
          userData: JSON.parse(userData),
        })
      }
    },
  },
})
