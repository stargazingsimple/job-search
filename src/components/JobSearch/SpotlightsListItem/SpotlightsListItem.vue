<script>
export default {
  name: 'SpotlightsListItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <router-link
    to="/job/results"
    class="bg-brand-gray-2 mx-5 flex h-96 w-72 flex-col rounded-lg border"
  >
    <img :src="img" :alt="title" class="object-contain" />
    <div class="mt-3 h-48 px-6 py-4">
      <h3 class="text-lg font-medium">{{ title }}</h3>
      <p class="mt-3 text-sm">{{ description }}</p>
    </div>
    <router-link to="/job/results" class="text-brand-blue-1 px-6 pb-4 text-sm">
      See jobs
    </router-link>
  </router-link>
</template>
