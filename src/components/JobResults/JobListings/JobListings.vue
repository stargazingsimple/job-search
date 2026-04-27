<script>
import { getJobs } from '@/api/jobs.js'
import JobListing from '@/components/JobResults/JobListing/JobListing.vue'

export default {
  name: 'JobListings',
  components: { JobListing },
  data() {
    return {
      jobs: [],
    }
  },
  async mounted() {
    const { data } = await getJobs()

    this.jobs = data
  },
}
</script>

<template>
  <main class="bg-brand-gray-2 flex-auto p-8">
    <ol>
      <job-listing v-for="job in jobs" :key="job.id" :job="job" />
    </ol>
  </main>
</template>
