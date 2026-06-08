import { defineStore } from 'pinia'
import type { Degree } from '@/api/degrees/types.ts'
import { computed, ref } from 'vue'
import { getDegrees } from '@/api/degrees/degrees.ts'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const FETCH_DEGREES = async () => {
    const res = await getDegrees()
    if (!res) return

    degrees.value = res.data
  }

  const UNIQUE_DEGREES = computed(() => {
    const uniqueDegrees = new Set<string>()

    degrees.value.forEach(({ degree }) => {
      uniqueDegrees.add(degree)
    })

    return uniqueDegrees
  })

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES }
})
