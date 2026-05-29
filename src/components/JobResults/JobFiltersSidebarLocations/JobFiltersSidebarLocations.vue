<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user/user.ts'

const userStore = useUserStore()

const locationsSearchTerm = computed({
  get() {
    return userStore.locationsSearchTerm
  },
  set(value: string) {
    userStore.UPDATE_LOCATIONS_SEARCH_TERM(value)
  },
})
</script>

<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="locationsSearchTerm"
      type="text"
      class="border-brand-gray-1 shadow-gray h-12 w-full rounded border-solid p-3 text-base"
      placeholder="Location"
    />
  </div>
</template>
