import { mount, type VueWrapper } from '@vue/test-utils'
import { findComponentByPropertyValue } from '@/tests/utils.ts'
import { createTestingPinia } from '@pinia/testing'
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'

const { route } = vi.hoisted(() => {
  return {
    route: {
      name: 'home',
    },
  }
})

vi.mock('vue-router', () => {
  return {
    useRoute: vi.fn().mockReturnValue(route),
  }
})

describe('MainNav', () => {
  let wrapper: VueWrapper<InstanceType<typeof MainNav>>

  const createComponent = () => {
    wrapper = mount(MainNav, {
      global: {
        stubs: ['fa-icon', 'router-link', 'the-sub-nav'],
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.each`
    text         | link
    ${'Careers'} | ${'/'}
    ${'Jobs'}    | ${'/job/results'}
    ${'Teams'}   | ${'/teams'}
  `('should render router-link component with $link link', ({ link }) => {
    createComponent()

    const routerLinkComponent = findComponentByPropertyValue(
      wrapper,
      'router-link',
      'attributes',
      'to',
      link,
    )

    expect(routerLinkComponent).toBeDefined()
  })

  it("should displays 'TheSubNav' component", () => {
    route.name = 'job-results'

    createComponent()

    const theSubNavComponent = wrapper.findComponent({ name: 'TheSubNav' })

    expect(theSubNavComponent.exists()).toBe(true)
  })
})
