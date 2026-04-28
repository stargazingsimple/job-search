import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.js'
import JobListings from '@/components/JobResults/JobListings/JobListings.vue'

const { getJobs } = vi.hoisted(() => ({
  getJobs: vi.fn(),
}))

vi.mock(import('@/api/jobs.js'), () => ({
  getJobs: getJobs.mockResolvedValue({ data: {} }),
}))

describe('JobListings', () => {
  let wrapper

  const createComponent = (queryParams = {}) => {
    wrapper = mount(JobListings, {
      global: {
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

    expect(getJobs).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    getJobs.mockResolvedValue({ data: Array(15).fill({}) })

    createComponent()

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
    getJobs.mockResolvedValue({ data: Array(15).fill({}) })

    createComponent({
      page: pageValue,
    })

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element.exists()).toBe(true)
  })

  it.each`
    pageValue    | linkText
    ${undefined} | ${'Previous'}
    ${2}         | ${'Next'}
  `('does not show link to $linkText page', async ({ pageValue, linkText }) => {
    getJobs.mockResolvedValue({ data: Array(15).fill({}) })

    createComponent({
      page: pageValue,
    })

    await flushPromises()

    const element = findElementByText(wrapper, 'a', linkText)

    expect(element).toBeUndefined()
  })
})
