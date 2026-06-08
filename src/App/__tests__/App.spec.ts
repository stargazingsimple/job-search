import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '@/App/App.vue'

describe('App', () => {
  let wrapper: VueWrapper<InstanceType<typeof App>>

  const createComponent = () => {
    wrapper = mount(App, {
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
