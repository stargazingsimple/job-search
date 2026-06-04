<script setup lang="ts">
import type { Job } from '@/api/jobs/types'
import { GET_JOB_BY_ID, useJobsStore } from '@/store/modules/jobs/jobs'
import { onMounted, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const job = ref<Job | null>(null)

const jobsStore = useJobsStore()

onMounted(() => {
  const data = jobsStore[GET_JOB_BY_ID](Number(props.id))

  if (data) {
    job.value = data
  }
})
</script>

<template>
  <div v-if="job" class="p-8">
    <div class="px-4 sm:px-0">
      <h3 class="text-base/7 font-semibold text-gray-900">{{ job.title }}</h3>
      <p class="mt-1 max-w-2xl text-sm/6 text-gray-500">
        {{ job.organization }}
      </p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Job type</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{{ job.jobType }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Locations</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span v-for="(location, idx) in job.locations" :key="location">
              {{ location }}<span v-if="idx !== job.locations.length - 1">, </span>
            </span>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Degree</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{{ job.degree }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Minimum qualifications</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <ul>
              <li v-for="qualification in job.minimumQualifications" :key="qualification">
                <fa-icon icon="check" size="2xs" /> {{ qualification }}
              </li>
            </ul>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Preferred qualifications</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <ul>
              <li v-for="qualification in job.preferredQualifications" :key="qualification">
                <fa-icon icon="circle" size="2xs" /> {{ qualification }}
              </li>
            </ul>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Description</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span v-for="description in job.description" :key="description">
              {{ description }}
            </span>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Date added</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{{ job.dateAdded }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
