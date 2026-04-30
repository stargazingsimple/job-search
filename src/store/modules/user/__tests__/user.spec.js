import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../user'

describe('user store module', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useUserStore()
  })

  describe('state', () => {
    it('keeps track of if user is logged in', () => {
      expect(store.isLoggedIn).toBe(false)
    })
  })

  describe('actions', () => {
    describe('LOGIN_USER', () => {
      beforeEach(() => {
        store.LOGIN_USER()
      })

      it('logs the user in', () => {
        expect(store.isLoggedIn).toBe(true)
      })
    })
  })
})
