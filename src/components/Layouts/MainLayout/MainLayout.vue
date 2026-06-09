<script setup lang="ts">
import TransitionWrapper from '@/components/Shared/TransitionWrapper/TransitionWrapper.vue'
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'
</script>

<template>
  <main-nav />
  <router-view #default="{ Component }">
    <transition-wrapper>
      <component :is="Component" />
    </transition-wrapper>
  </router-view>
</template>
