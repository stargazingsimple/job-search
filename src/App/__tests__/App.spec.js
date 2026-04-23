import { mount } from '@vue/test-utils'
import router from '@/router/index.js'
import App from '@/App/App.vue'

describe('App', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(App, {
      global: {
        stubs: ['fa-icon'],
        plugins: [router],
      },
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
