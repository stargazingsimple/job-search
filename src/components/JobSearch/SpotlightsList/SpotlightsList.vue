<script>
import { getSpotlights } from '@/api/spotlights/spotlights'

export default {
  name: 'SpotlightsList',
  data() {
    return {
      spotlights: [],
    }
  },
  async mounted() {
    const { data } = await getSpotlights()

    this.spotlights = data
  },
}
</script>

<template>
  <ul>
    <li v-for="{ img, title, description, id } in spotlights" :key="id">
      <slot :img="img" :title="title" :description="description" />
    </li>
  </ul>
</template>
