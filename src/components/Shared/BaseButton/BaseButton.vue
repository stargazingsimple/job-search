<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'Click me!',
  },
  type: {
    type: String,
    default: 'primary',
    validator(value: 'primary' | 'secondary') {
      return ['primary', 'secondary'].includes(value)
    },
  },
})
</script>

<template>
  <button :class="type">{{ text }}</button>
</template>

<style scoped>
@reference '@/styles/main.css';

button {
  @apply cursor-pointer px-5 py-3 font-medium;
}

.primary {
  @apply bg-brand-blue-1 hover:shadow-blue rounded text-white;
}

.secondary {
  @apply text-brand-blue-1 hover:bg-brand-blue-2 bg-transparent hover:text-white;
}
</style>
