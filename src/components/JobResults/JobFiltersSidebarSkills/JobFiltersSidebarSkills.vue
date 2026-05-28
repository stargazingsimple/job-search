<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user/user.ts'

const userStore = useUserStore()

const skillsSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm
  },
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value)
  },
})
</script>

<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="border-brand-gray-1 shadow-gray h-12 w-full rounded border-solid p-3 text-base"
      placeholder="Computer programming, Finance degree"
    />
  </div>
</template>
