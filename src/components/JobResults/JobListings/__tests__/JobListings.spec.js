import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.js'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/store/modules/jobs/jobs'
import JobListings from '@/components/JobResults/JobListings/JobListings.vue'

describe('JobListings', () => {
  let wrapper

  const createComponent = (queryParams = {}) => {
    wrapper = mount(JobListings, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: {
            query: {
              page: '1',
              ...queryParams,
            },
          },
        },
      },
    })
  }

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('fetches jobs', () => {
    createComponent()

    const jobsStore = useJobsStore()

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    createComponent()

    const jobsStore = useJobsStore()

    jobsStore.jobs = Array(15).fill({})

    await flushPromises()

    const jobList = wrapper.findAllComponents({ name: 'JobListing' })

    expect(jobList).toHaveLength(10)
  })

  it.each`
    pageValue    | text
    ${undefined} | ${'Page 1'}
    ${3}         | ${'Page 3'}
  `('displays current page text $text', async ({ pageValue, text }) => {
    createComponent({
      page: pageValue,
    })

    await flushPromises()

    const currentPageElement = wrapper.find('[data-test="current-page"]')

    expect(currentPageElement.text()).toBe(text)
  })

  it.each`
    pageValue    | linkText
    ${undefined} | ${'Next'}
    ${2}         | ${'Previous'}
  `('shows link to $linkText page', async ({ pageValue, linkText }) => {
    createComponent({
      page: pageValue,
    })

    const jobsStore = useJobsStore()

    jobsStore.jobs = Array(15).fill({})

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element.exists()).toBe(true)
  })

  it.each`
    pageValue    | linkText
    ${undefined} | ${'Previous'}
    ${2}         | ${'Next'}
  `('does not show link to $linkText page', async ({ pageValue, linkText }) => {
    createComponent({
      page: pageValue,
    })

    const jobsStore = useJobsStore()

    jobsStore.jobs = Array(15).fill({})

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element).toBeUndefined()
  })
})
