import { flushPromises, mount } from '@vue/test-utils'
import JobListings from '@/components/JobResults/JobListings/JobListings.vue'

const { getJobs } = vi.hoisted(() => ({
  getJobs: vi.fn(),
}))

vi.mock(import('@/api/jobs.js'), () => ({
  getJobs: getJobs.mockResolvedValue({ data: {} }),
}))

describe('JobListings', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(JobListings, {
      global: {
        stubs: ['router-link'],
      },
    })
  }

  afterEach(() => {
    vi.resetAllMocks()
    wrapper.unmount()
  })

  it('fetches jobs', () => {
    createComponent()

    expect(getJobs).toHaveBeenCalled()
  })

  it('creates a job listing for every job', async () => {
    getJobs.mockResolvedValue({ data: Array(3).fill({}) })

    createComponent()

    await flushPromises()

    const jobList = wrapper.findAllComponents({ name: 'JobListing' })

    expect(jobList).toHaveLength(3)
  })
})
