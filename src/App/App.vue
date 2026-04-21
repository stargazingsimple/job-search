<script>
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'
import TheHero from '@/components/JobSearch/TheHero/TheHero.vue'

export default {
  name: 'App',
  components: {
    TheHero,
    MainNav,
  },
}
</script>

<template>
  <main-nav />
  <the-hero />
</template>
