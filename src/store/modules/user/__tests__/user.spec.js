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

    it('stores organizations that the user would like to filter jobs by', () => {
      expect(store.selectedOrganizations).toStrictEqual([])
    })

    it('stores job types that the user would like to filter jobs by', () => {
      expect(store.selectedJobTypes).toStrictEqual([])
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

    describe('ADD_SELECTED_ORGANIZATIONS', () => {
      it('updates organizations the user has chosen to filter jobs by', () => {
        store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2'])

        expect(store.selectedOrganizations).toStrictEqual(['Org1', 'Org2'])
      })
    })

    describe('ADD_SELECTED_JOB_TYPES', () => {
      it('updates job types the user has chosen to filter jobs by', () => {
        store.ADD_SELECTED_JOB_TYPES(['Full-time', 'Part-time'])

        expect(store.selectedJobTypes).toStrictEqual(['Full-time', 'Part-time'])
      })
    })
  })
})
