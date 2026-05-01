import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/store/modules/jobs/jobs'
import TheSubNav from '@/components/Navigation/TheSubNav/TheSubNav.vue'

describe('TheSubNav', () => {
  let wrapper

  const createComponent = (routeName = 'job-results') => {
    wrapper = mount(TheSubNav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: ['fa-icon'],
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  }

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('when user is on job results page', async () => {
    createComponent()

    const jobCountElement = wrapper.find('[data-test="job-count"]')
    const jobsStore = useJobsStore()
    const numberOfJobs = 16

    jobsStore.FILTERED_JOBS_BY_ORGANIZATION = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.text()).toBe(`${numberOfJobs}`)
  })

  it('does NOT display job count', async () => {
    createComponent('home')

    const jobCountElement = wrapper.find('[data-test="job-count"]')
    const jobsStore = useJobsStore()
    const numberOfJobs = 16

    jobsStore.FILTERED_JOBS_BY_ORGANIZATION = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.exists()).toBe(false)
  })
})
