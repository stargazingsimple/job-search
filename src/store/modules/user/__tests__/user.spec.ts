import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../user'

describe('user store module', () => {
  let userStore: ReturnType<typeof useUserStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    userStore = useUserStore()
  })

  describe('state', () => {
    it('keeps track of if user is logged in', () => {
      expect(userStore.isLoggedIn).toBe(false)
    })

    it('stores organizations that the user would like to filter jobs by', () => {
      expect(userStore.selectedOrganizations).toStrictEqual([])
    })

    it('stores job types that the user would like to filter jobs by', () => {
      expect(userStore.selectedJobTypes).toStrictEqual([])
    })

    it('stores degrees that the user would like to filter jobs by', () => {
      expect(userStore.selectedDegrees).toStrictEqual([])
    })

    it('stores users search term for skills and qualifications', () => {
      expect(userStore.skillsSearchTerm).toBe('')
    })
  })

  describe('actions', () => {
    describe('LOGIN_USER', () => {
      beforeEach(() => {
        userStore.LOGIN_USER()
      })

      it('logs the user in', () => {
        expect(userStore.isLoggedIn).toBe(true)
      })
    })

    describe('ADD_SELECTED_ORGANIZATIONS', () => {
      it('updates organizations the user has chosen to filter jobs by', () => {
        userStore.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2'])

        expect(userStore.selectedOrganizations).toStrictEqual(['Org1', 'Org2'])
      })
    })

    describe('ADD_SELECTED_JOB_TYPES', () => {
      it('updates job types the user has chosen to filter jobs by', () => {
        userStore.ADD_SELECTED_JOB_TYPES(['Full-time', 'Part-time'])

        expect(userStore.selectedJobTypes).toStrictEqual(['Full-time', 'Part-time'])
      })
    })

    describe('ADD_SELECTED_DEGREES', () => {
      it('updates degrees the user has chosen to filter jobs by', () => {
        userStore.ADD_SELECTED_DEGREES(["Master's", "Bachelor's"])

        expect(userStore.selectedDegrees).toStrictEqual(["Master's", "Bachelor's"])
      })
    })

    describe('UPDATE_SKILLS_SEARCH_TERM', () => {
      it('receives search term for skills the user has entered', () => {
        userStore.skillsSearchTerm = ''

        userStore.UPDATE_SKILLS_SEARCH_TERM('Vue')

        expect(userStore.skillsSearchTerm).toBe('Vue')
      })
    })

    describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
      it('removes all job filters that user has chosen', () => {
        userStore.selectedOrganizations = ['Random organization']
        userStore.selectedJobTypes = ['Random job type']
        userStore.selectedDegrees = ['Random degree']
        userStore.skillsSearchTerm = 'Vue Developer'

        userStore.CLEAR_USER_JOB_FILTER_SELECTIONS()

        expect(userStore.selectedOrganizations).toStrictEqual([])
        expect(userStore.selectedJobTypes).toStrictEqual([])
        expect(userStore.selectedDegrees).toStrictEqual([])
        expect(userStore.skillsSearchTerm).toBe('')
      })
    })
  })
})
