<script>
import JobListing from '@/components/JobResults/JobListing/JobListing.vue'

export default {
  name: 'JobListings',
  components: { JobListing },
}
</script>

<template>
  <main class="bg-brand-gray-2 flex-auto p-8">
    <ol>
      <job-listing />
    </ol>
  </main>
</template>
