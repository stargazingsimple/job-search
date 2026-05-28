<script setup lang="ts">
import { computed } from 'vue'
import { useJobsStore } from '@/store/modules/jobs/jobs.ts'
import { useUserStore } from '@/store/modules/user/user.ts'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebarCheckboxGroup/JobFiltersSidebarCheckboxGroup.vue'

const userStore = useUserStore()
const jobsStore = useJobsStore()

const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)
</script>

<template>
  <job-filters-sidebar-checkbox-group
    :action="userStore.ADD_SELECTED_JOB_TYPES"
    :unique-values="UNIQUE_JOB_TYPES"
  />
</template>
