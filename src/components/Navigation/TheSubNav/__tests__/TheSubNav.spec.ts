import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/store/modules/jobs/jobs.ts'
import { mockedStore } from '@/tests/mocked-store.ts'
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
  let wrapper: VueWrapper<InstanceType<typeof TheSubNav>>

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
    const numberOfJobs = 16

    const jobsStore = mockedStore(useJobsStore)

    jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.text()).toBe(`${numberOfJobs}`)
  })

  it('does NOT display job count', async () => {
    route.name = 'home'

    createComponent()

    const jobCountElement = wrapper.find('[data-test="job-count"]')
    const numberOfJobs = 16

    const jobsStore = mockedStore(useJobsStore)

    jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.exists()).toBe(false)
  })
})
