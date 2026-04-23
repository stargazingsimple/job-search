<script>
export default {
  name: 'JobListing',
}
</script>

<template>
  <li class="mb-7">
    <router-link
      to="/job/results/1"
      class="border-brand-gray-2 hover:shadow-gray mx-auto block rounded border border-solid bg-white"
    >
      <div class="border-brand-gray-2 mx-8 border-b border-solid pt-5 pb-2">
        <h2 class="mb-2 text-2xl">Technical Program Manager</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>Careers</span>
          </div>
          <div>
            <span>Los Angeles</span>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Qualifications</h3>
          <div>
            <ul class="list-disc pl-8">
              <li>Bachelor's degree</li>
              <li>5 years of experience</li>
              <li>Experience analyzing</li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link to="/job/results/1" class="text-brand-blue-1">Expand</router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>
