import { flushPromises, mount, RouterLinkStub, type VueWrapper } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.ts'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/store/modules/jobs/jobs.ts'
import { useDegreesStore } from '@/store/modules/degrees/degrees.ts'
import JobListings from '@/components/JobResults/JobListings/JobListings.vue'

const { route } = vi.hoisted(() => {
  return {
    route: {
      query: {
        page: '1',
      },
    },
  }
})

vi.mock('vue-router', () => {
  return {
    useRoute: vi.fn().mockReturnValue(route),
  }
})

describe('JobListings', () => {
  let wrapper: VueWrapper<InstanceType<typeof JobListings>>,
    jobsStore: ReturnType<typeof useJobsStore>,
    degreesStore: ReturnType<typeof useDegreesStore>

  const createComponent = () => {
    wrapper = mount(JobListings, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  }

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false })
    jobsStore = useJobsStore(pinia)
    degreesStore = useDegreesStore(pinia)
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('fetches jobs', () => {
    createComponent()

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('fetches degrees', () => {
    createComponent()

    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    createComponent()

    // @ts-expect-error: Getter is read only
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    await flushPromises()

    const jobList = wrapper.findAllComponents({ name: 'JobListing' })

    expect(jobList).toHaveLength(10)
  })

  it.each`
    pageValue    | text
    ${undefined} | ${'Page 1'}
    ${'3'}       | ${'Page 3'}
  `('displays current page text $text', async ({ pageValue, text }) => {
    route.query.page = pageValue

    createComponent()

    await flushPromises()

    const currentPageElement = wrapper.find('[data-test="current-page"]')

    expect(currentPageElement.text()).toBe(text)
  })

  it.each`
    pageValue    | linkText
    ${undefined} | ${'Next'}
    ${'2'}       | ${'Previous'}
  `('shows link to $linkText page', async ({ pageValue, linkText }) => {
    route.query.page = pageValue

    createComponent()

    // @ts-expect-error: Getter is read only
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element).toBeDefined()
  })

  it.each`
    pageValue    | linkText
    ${undefined} | ${'Previous'}
    ${'2'}       | ${'Next'}
  `('does not show link to $linkText page', async ({ pageValue, linkText }) => {
    route.query.page = pageValue

    createComponent()

    // @ts-expect-error: Getter is read only
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element).toBeUndefined()
  })
})
