import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const skillsSearchTerm = ref('')

  const LOGIN_USER = () => {
    isLoggedIn.value = true
  }
  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations
  }
  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }
  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }
  const UPDATE_SKILLS_SEARCH_TERM = (term: string) => {
    skillsSearchTerm.value = term
  }
  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedOrganizations.value = []
    selectedJobTypes.value = []
    selectedDegrees.value = []
  }

  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    skillsSearchTerm,
    LOGIN_USER,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    UPDATE_SKILLS_SEARCH_TERM,
    CLEAR_USER_JOB_FILTER_SELECTIONS,
  }
})
