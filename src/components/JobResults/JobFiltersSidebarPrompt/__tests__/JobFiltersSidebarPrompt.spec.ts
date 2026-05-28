import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/store/modules/user/user.ts'
import JobFiltersSidebarPrompt from '@/components/JobResults/JobFiltersSidebarPrompt/JobFiltersSidebarPrompt.vue'

describe('JobFiltersSidebarPrompt', () => {
  let wrapper: VueWrapper<InstanceType<typeof JobFiltersSidebarPrompt>>,
    userStore: ReturnType<typeof useUserStore>

  const createComponent = () => {
    wrapper = mount(JobFiltersSidebarPrompt)
  }

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false })
    userStore = useUserStore(pinia)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it("sends message to clear all of user's job search filters", async () => {
    createComponent()

    const baseButtonComponent = wrapper.findComponent({ name: 'BaseButton' })

    await baseButtonComponent.trigger('click')

    expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled()
  })
})
