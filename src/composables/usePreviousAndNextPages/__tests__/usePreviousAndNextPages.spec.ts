import { ref } from 'vue'
import usePreviousAndNextPages from '../usePreviousAndNextPages.ts'

describe('usePreviousAndNextPages', () => {
  it('calculates page before current one', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)

    expect(previousPage.value).toEqual(7)
  })

  it('when current page is the first page, does not provide previous page', () => {
    const currentPage = ref(1)
    const maxPage = ref(1)
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)

    expect(previousPage.value).toBeUndefined()
  })

  it('calculates page after current one', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)

    expect(nextPage.value).toEqual(9)
  })

  it('when current page is the last page, does not provide next page', () => {
    const currentPage = ref(8)
    const maxPage = ref(8)
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)

    expect(nextPage.value).toBeUndefined()
  })
})
