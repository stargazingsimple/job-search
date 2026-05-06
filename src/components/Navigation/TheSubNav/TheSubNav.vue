<script>
import { mapState } from 'pinia'
import { FILTERED_JOBS, useJobsStore } from '@/store/modules/jobs/jobs'

export default {
  name: 'TheSubNav',
  computed: {
    ...mapState(useJobsStore, [FILTERED_JOBS]),
    onJobResultsPage() {
      return this.$route.name === 'job-results'
    },
  },
}
</script>

<template>
  <div class="border-brand-gray-1 h-16 w-full border-b border-solid bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <fa-icon icon="search" class="mr-3" />
        <span>
          <span class="text-brand-green-1" data-test="job-count">
            {{ FILTERED_JOBS.length }}
          </span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>
