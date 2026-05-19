import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.js'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/store/modules/jobs/jobs.ts'
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
  let wrapper, jobsStore

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
    jobsStore = useJobsStore(createTestingPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('fetches jobs', () => {
    createComponent()

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    createComponent()

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

    jobsStore.FILTERED_JOBS = Array(15).fill({})

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element.exists()).toBe(true)
  })

  it.each`
    pageValue    | linkText
    ${undefined} | ${'Previous'}
    ${'2'}       | ${'Next'}
  `('does not show link to $linkText page', async ({ pageValue, linkText }) => {
    route.query.page = pageValue

    createComponent()

    jobsStore.FILTERED_JOBS = Array(15).fill({})

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element).toBeUndefined()
  })
})
