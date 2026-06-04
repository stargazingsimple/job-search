<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'No Results Found',
  },
  text: {
    type: String,
    default:
      "We couldn't find any matching items at the moment. Try adjusting your search or filters, or check back later for new updates.",
  },
  iconType: {
    type: String,
    default: 'magnifying-glass',
  },
  iconSize: {
    type: String,
    default: '3x',
  },
})
</script>

<template>
  <div class="flex h-screen flex-col justify-center px-4 text-center">
    <fa-icon :icon="iconType" :size="iconSize" width-auto />
    <h2 class="mt-6 text-2xl font-bold text-gray-900">{{ title }}</h2>
    <p class="mt-4 text-pretty text-gray-700">
      {{ text }}
    </p>
  </div>
</template>
