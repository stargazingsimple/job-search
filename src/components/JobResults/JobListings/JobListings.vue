<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/store/modules/jobs/jobs.ts'
import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages/usePreviousAndNextPages'
import JobListing from '@/components/JobResults/JobListing/JobListing.vue'

const route = useRoute()
const jobsStore = useJobsStore()

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)
const currentPage = computed(() => Number.parseInt(route.query.page || '1'))
const displayedJobs = computed(() => {
  const firstJobIndex = (currentPage.value - 1) * 10
  const lastJobIndex = currentPage.value * 10

  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))

const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, maxPage)

onMounted(() => {
  jobsStore.FETCH_JOBS()
})
</script>

<template>
  <main class="bg-brand-gray-2 flex-auto p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="grow text-sm" data-test="current-page">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'job-results', query: { page: previousPage } }"
            class="text-brand-blue-1 mx-3 text-sm font-semibold"
          >
            Previous
          </router-link>
          <router-link
            v-if="nextPage"
            :to="{ name: 'job-results', query: { page: nextPage } }"
            class="text-brand-blue-1 mx-3 text-sm font-semibold"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
