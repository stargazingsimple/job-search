import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useJobsStore } from '@/store/modules/jobs/jobs.ts'
import { createTestingPinia } from '@pinia/testing'
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
  let wrapper: VueWrapper<InstanceType<typeof TheSubNav>>,
    jobsStore: ReturnType<typeof useJobsStore>

  const createComponent = () => {
    wrapper = mount(TheSubNav, {
      global: {
        stubs: ['fa-icon'],
      },
    })
  }

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false })
    jobsStore = useJobsStore(pinia)
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('when user is on job results page', async () => {
    createComponent()

    const jobCountElement = wrapper.find('[data-test="job-count"]')
    const numberOfJobs = 16

    // @ts-expect-error: Getter is read only
    jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.text()).toBe(`${numberOfJobs}`)
  })

  it('does NOT display job count', async () => {
    route.name = 'home'

    createComponent()

    const jobCountElement = wrapper.find('[data-test="job-count"]')
    const numberOfJobs = 16

    // @ts-expect-error: Getter is read only
    jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

    await nextTick()

    expect(jobCountElement.exists()).toBe(false)
  })
})
