import { mount } from '@vue/test-utils'
import { useJobsStore } from '@/store/modules/jobs/jobs'
import { useUserStore } from '@/store/modules/user/user'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarJobTypes from '../JobFiltersSidebarJobTypes.vue'

describe('JobFiltersSidebarJobTypes', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(JobFiltersSidebarJobTypes, {
      global: { stubs: ['fa-icon'], plugins: [createTestingPinia({ stubActions: false })] },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders unique list of job types from jobs', async () => {
    createComponent()

    const jobStore = useJobsStore()

    jobStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time'])

    const headerElement = wrapper.find('[data-test="header"]')

    await headerElement.trigger('click')

    const jobTypesListItems = wrapper.findAll('li')
    const jobTypes = jobTypesListItems.map((item) => item.text())

    expect(jobTypes).toStrictEqual(['Full-time', 'Part-time'])
  })

  it.each`
    selectedJobType
    ${'Full-time'}
    ${'Part-time'}
  `(
    'communicates that user has selected checkbox for $selectedJobType',
    async ({ selectedJobType }) => {
      createComponent()

      const jobStore = useJobsStore()
      const userStore = useUserStore()

      jobStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time'])

      const headerElement = wrapper.find('[data-test="header"]')

      await headerElement.trigger('click')

      const checkboxElement = wrapper.find(`#${selectedJobType}`)

      await checkboxElement.setValue()

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([selectedJobType])
    },
  )
})
