<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>Job Page {{ id }}</div>
</template>
