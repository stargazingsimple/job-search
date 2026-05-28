<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/user.ts'
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion/CollapsibleAccordion.vue'
import JobFiltersSidebarDegrees from '@/components/JobResults/JobFiltersSidebarDegrees/JobFiltersSidebarDegrees.vue'
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebarJobTypes/JobFiltersSidebarJobTypes.vue'
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebarOrganizations/JobFiltersSidebarOrganizations.vue'

const userStore = useUserStore()

const filterItems = [
  {
    header: 'Degrees',
    component: JobFiltersSidebarDegrees,
  },
  {
    header: 'Job Types',
    component: JobFiltersSidebarJobTypes,
  },
  {
    header: 'Organizations',
    component: JobFiltersSidebarOrganizations,
  },
]
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
      <collapsible-accordion
        v-for="{ header, component } in filterItems"
        :key="header"
        :header="header"
      >
        <component :is="component" />
      </collapsible-accordion>
    </section>
  </div>
</template>
