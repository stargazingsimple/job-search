import { mount, RouterLinkStub } from '@vue/test-utils'
import JobListing from '@/components/JobResults/JobListing/JobListing.vue'

const JOB_PROP = {
  title: 'Vue Developer',
  organization: 'AirBnB',
  locations: ['Orlando', 'Jacksonville'],
  minimumQualifications: ['Code', 'Develop'],
}

describe('JobListing', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(JobListing, {
      props: {
        job: JOB_PROP,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.each`
    propName
    ${'title'}
    ${'organization'}
  `('renders job $propName', ({ propName }) => {
    createComponent()

    const element = wrapper.find(`[data-test=job-${propName}]`)

    expect(element.text()).toBe(JOB_PROP[propName])
  })

  it.each(JOB_PROP.locations)("renders job location '%s'", (location) => {
    createComponent()

    const jobLocationElements = wrapper.findAll('[data-test=job-location]')

    expect(jobLocationElements.some((locationElement) => locationElement.text() === location)).toBe(
      true,
    )
  })

  it.each(JOB_PROP.minimumQualifications)("renders job qualification '%s'", (qualification) => {
    createComponent()

    const jobQualificationElements = wrapper.findAll('[data-test=job-qualification]')

    expect(
      jobQualificationElements.some(
        (qualificationElement) => qualificationElement.text() === qualification,
      ),
    ).toBe(true)
  })
})
