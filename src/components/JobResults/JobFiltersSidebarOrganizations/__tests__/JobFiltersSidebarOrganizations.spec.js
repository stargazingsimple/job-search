import { mount } from '@vue/test-utils'
import { useJobsStore } from '@/store/modules/jobs/jobs'
import { useUserStore } from '@/store/modules/user/user'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarOrganizations from '../JobFiltersSidebarOrganizations.vue'

const router = {
  push: vi.fn(),
}

describe('JobFiltersSidebarOrganizations', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(JobFiltersSidebarOrganizations, {
      global: {
        stubs: ['fa-icon'],
        plugins: [createTestingPinia({ stubActions: false })],
        mocks: {
          $router: router,
        },
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders unique list of organizations from jobs', async () => {
    createComponent()

    const jobStore = useJobsStore()

    jobStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    const headerElement = wrapper.find('[data-test="header"]')

    await headerElement.trigger('click')

    const organizationListItems = wrapper.findAll('li')
    const organizations = organizationListItems.map((item) => item.text())

    expect(organizations).toStrictEqual(['Google', 'Amazon'])
  })

  it.each`
    selectedOrganization
    ${'Google'}
    ${'Amazon'}
  `(
    'communicates that user has selected checkbox for $selectedOrganization',
    async ({ selectedOrganization }) => {
      createComponent()

      const jobStore = useJobsStore()
      const userStore = useUserStore()

      jobStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

      const headerElement = wrapper.find('[data-test="header"]')

      await headerElement.trigger('click')

      const checkboxElement = wrapper.find(`#${selectedOrganization}`)

      await checkboxElement.setValue()

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([selectedOrganization])
    },
  )

  it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
    createComponent()

    const jobStore = useJobsStore()

    jobStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    const headerElement = wrapper.find('[data-test="header"]')

    await headerElement.trigger('click')

    const checkboxElement = wrapper.find(`#Google`)

    await checkboxElement.setValue()

    expect(router.push).toHaveBeenCalledWith({ name: 'job-results' })
  })
})
