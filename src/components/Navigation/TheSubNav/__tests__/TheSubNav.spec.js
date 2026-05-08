import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/store/modules/jobs/jobs'
import TheSubNav from '@/components/Navigation/TheSubNav/TheSubNav.vue'

const { route } = vi.hoisted(() => {
  return {
    route: { name: 'job-results' },
  }
})

vi.mock('vue-router', () => {
  return {
    useRoute: vi.fn().mockReturnValue(route),
  }
})

describe('TheSubNav', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(TheSubNav, {
      global: {
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

    jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.text()).toBe(`${numberOfJobs}`)
  })

  it('does NOT display job count', async () => {
    route.name = 'home'

    createComponent()

    const jobCountElement = wrapper.find('[data-test="job-count"]')
    const jobsStore = useJobsStore()
    const numberOfJobs = 16

    jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.exists()).toBe(false)
  })
})
