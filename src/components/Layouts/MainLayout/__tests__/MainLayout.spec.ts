import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import MainLayout from '../MainLayout.vue'

describe('MainLayout', () => {
  let wrapper: VueWrapper<InstanceType<typeof MainLayout>>

  const createComponent = () => {
    wrapper = mount(MainLayout, {
      global: {
        stubs: ['fa-icon', 'router-link', 'router-view', 'main-nav'],
      },
      plugins: [createTestingPinia({ stubActions: false })],
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it("should render 'MainNav' component", () => {
    createComponent()

    const mainNavComponent = wrapper.findComponent({ name: 'MainNav' })

    expect(mainNavComponent.exists()).toBe(true)
  })
})
