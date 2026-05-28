<script setup lang="ts">
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion/CollapsibleAccordion.vue'
import JobFiltersSidebarDegrees from '@/components/JobResults/JobFiltersSidebarDegrees/JobFiltersSidebarDegrees.vue'
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebarJobTypes/JobFiltersSidebarJobTypes.vue'
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebarOrganizations/JobFiltersSidebarOrganizations.vue'
import JobFiltersSidebarPrompt from '@/components/JobResults/JobFiltersSidebarPrompt/JobFiltersSidebarPrompt.vue'
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebarSkills/JobFiltersSidebarSkills.vue'

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
      <job-filters-sidebar-prompt />
      <job-filters-sidebar-skills />
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
