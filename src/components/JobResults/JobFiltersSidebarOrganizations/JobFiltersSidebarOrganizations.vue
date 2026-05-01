<script>
import { mapActions, mapState } from 'pinia'
import { UNIQUE_ORGANIZATIONS, useJobsStore } from '@/store/modules/jobs/jobs'
import { ADD_SELECTED_ORGANIZATIONS, useUserStore } from '@/store/modules/user/user'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion/CollapsibleAccordion.vue'

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedOrganizations: [],
    }
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations)
    },
  },
}
</script>

<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="organization in UNIQUE_ORGANIZATIONS" :key="organization" class="h-8 w-1/2">
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
