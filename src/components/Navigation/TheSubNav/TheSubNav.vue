<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/store/modules/jobs/jobs'

const route = useRoute()
const jobsStore = useJobsStore()

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)
const onJobResultsPage = computed(() => route.name === 'job-results')
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
