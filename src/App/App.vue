<script>
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'
import TheHero from '@/components/Main/TheHero/TheHero.vue'

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
