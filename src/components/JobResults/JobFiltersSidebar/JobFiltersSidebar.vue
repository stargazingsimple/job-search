<script>
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'
import JobFiltersSidebarOrganizations from '../JobFiltersSidebarOrganizations/JobFiltersSidebarOrganizations.vue'

export default {
  name: 'JobFiltersSidebar',
  components: { BaseButton, JobFiltersSidebarOrganizations },
}
</script>

<template>
  <div class="border-brand-gray-1 flex w-96 flex-col border-r border-solid bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <base-button text="Clear Filters" type="secondary" />
        </div>
      </div>
      <job-filters-sidebar-organizations />
    </section>
  </div>
</template>
