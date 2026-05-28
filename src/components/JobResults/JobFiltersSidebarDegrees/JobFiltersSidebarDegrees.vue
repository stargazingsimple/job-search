<script setup lang="ts">
import { computed } from 'vue'
import { useDegreesStore } from '@/store/modules/degrees/degrees.ts'
import { useUserStore } from '@/store/modules/user/user.ts'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebarCheckboxGroup/JobFiltersSidebarCheckboxGroup.vue'

const userStore = useUserStore()
const degreesStore = useDegreesStore()

const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES)
</script>

<template>
  <job-filters-sidebar-checkbox-group
    :action="userStore.ADD_SELECTED_DEGREES"
    :unique-values="UNIQUE_DEGREES"
  />
</template>
