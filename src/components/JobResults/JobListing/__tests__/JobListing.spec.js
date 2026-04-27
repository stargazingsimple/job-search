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

    expect(wrapper.html()).toContain(JOB_PROP[propName])
  })

  it.each(JOB_PROP.locations)("renders job location '%s'", (location) => {
    createComponent()

    expect(wrapper.html()).toContain(location)
  })

  it.each(JOB_PROP.minimumQualifications)("renders job qualification '%s'", (qualification) => {
    createComponent()

    expect(wrapper.html()).toContain(qualification)
  })
})
