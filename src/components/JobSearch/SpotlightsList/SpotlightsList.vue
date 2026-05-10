<script setup>
import { onMounted, ref } from 'vue'
import { getSpotlights } from '@/api/spotlights/spotlights'

const spotlights = ref([])

onMounted(async () => {
  const { data } = await getSpotlights()

  spotlights.value = data
})
</script>

<template>
  <ul>
    <li v-for="{ img, title, description, id } in spotlights" :key="id">
      <slot :img="img" :title="title" :description="description" />
    </li>
  </ul>
</template>
