<script>
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'

export default {
  name: 'App',
  components: { MainNav },
}
</script>

<template>
  <main-nav />
  <router-view />
</template>
