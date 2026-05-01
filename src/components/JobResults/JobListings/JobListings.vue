<script>
import { mapActions, mapState } from 'pinia'
import { useJobsStore, FETCH_JOBS, FILTERED_JOBS_BY_ORGANIZATION } from '@/store/modules/jobs/jobs'
import JobListing from '@/components/JobResults/JobListing/JobListing.vue'

export default {
  name: 'JobListings',
  components: { JobListing },
  computed: {
    ...mapState(useJobsStore, {
      FILTERED_JOBS_BY_ORGANIZATION,
      nextPage() {
        const nextPage = this.currentPage + 1
        const maxPage = Math.ceil(this.FILTERED_JOBS_BY_ORGANIZATION.length / 10)

        return nextPage <= maxPage ? nextPage : undefined
      },
      displayedJobs() {
        const firstJobIndex = (this.currentPage - 1) * 10
        const lastJobIndex = this.currentPage * 10

        return this.FILTERED_JOBS_BY_ORGANIZATION.slice(firstJobIndex, lastJobIndex)
      },
    }),
    currentPage() {
      return Number.parseInt(this.$route.query.page || '1')
    },
    previousPage() {
      const previousPage = this.currentPage - 1

      return previousPage >= 1 ? previousPage : undefined
    },
  },
  mounted() {
    this.FETCH_JOBS()
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
  },
}
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
