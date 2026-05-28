<script setup lang="ts">
import { computed } from 'vue'
import { useJobsStore } from '@/store/modules/jobs/jobs.ts'
import { useUserStore } from '@/store/modules/user/user.ts'
import { useDegreesStore } from '@/store/modules/degrees/degrees.ts'
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebarCheckboxGroup/JobFiltersSidebarCheckboxGroup.vue'

const jobsStore = useJobsStore()
const userStore = useUserStore()
const degreesStore = useDegreesStore()

const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES)
</script>

<template>
  <div class="border-brand-gray-1 flex w-96 flex-col border-r border-solid bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <base-button
            text="Clear Filters"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
          />
        </div>
      </div>
      <job-filters-sidebar-checkbox-group
        :action="userStore.ADD_SELECTED_DEGREES"
        :unique-values="UNIQUE_DEGREES"
        header="Degrees"
      />
      <job-filters-sidebar-checkbox-group
        :action="userStore.ADD_SELECTED_JOB_TYPES"
        :unique-values="UNIQUE_JOB_TYPES"
        header="Job Types"
      />
      <job-filters-sidebar-checkbox-group
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
        :unique-values="UNIQUE_ORGANIZATIONS"
        header="Organizations"
      />
    </section>
  </div>
</template>
