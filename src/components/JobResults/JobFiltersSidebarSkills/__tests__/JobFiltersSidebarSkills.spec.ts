import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/store/modules/user/user.ts'
import { nextTick } from 'vue'
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebarSkills/JobFiltersSidebarSkills.vue'

describe('JobFiltersSidebarSkills', () => {
  let wrapper: VueWrapper<InstanceType<typeof JobFiltersSidebarSkills>>,
    userStore: ReturnType<typeof useUserStore>

  const createComponent = () => {
    wrapper = mount(JobFiltersSidebarSkills)
  }

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false })
    userStore = useUserStore(pinia)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('populates search input from store', async () => {
    createComponent()

    userStore.skillsSearchTerm = 'Programmer'

    await nextTick()

    const inputElement = wrapper.find('input').element

    expect(inputElement.value).toBe('Programmer')
  })

  it('writes user input to store', async () => {
    createComponent()

    userStore.skillsSearchTerm = ''

    const inputElement = wrapper.find('input')

    inputElement.element.value = ' V'

    await inputElement.trigger('change')

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('V')
  })
})
