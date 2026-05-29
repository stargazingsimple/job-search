import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/store/modules/user/user.ts'
import { nextTick } from 'vue'
import JobFiltersSidebarLocations from '@/components/JobResults/JobFiltersSidebarLocations/JobFiltersSidebarLocations.vue'

describe('JobFiltersSidebarLocations', () => {
  let wrapper: VueWrapper<InstanceType<typeof JobFiltersSidebarLocations>>,
    userStore: ReturnType<typeof useUserStore>

  const createComponent = () => {
    wrapper = mount(JobFiltersSidebarLocations)
  }

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false })
    userStore = useUserStore(pinia)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('populates location search input from store', async () => {
    createComponent()

    userStore.locationsSearchTerm = 'New York'

    await nextTick()

    const inputElement = wrapper.find('input').element

    expect(inputElement.value).toBe('New York')
  })

  it('writes location user input to store', async () => {
    createComponent()

    userStore.locationsSearchTerm = ''

    const inputElement = wrapper.find('input')

    inputElement.element.value = ' York'

    await inputElement.trigger('change')

    expect(userStore.UPDATE_LOCATIONS_SEARCH_TERM).toHaveBeenCalledWith('York')
  })
})
