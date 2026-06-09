<script setup lang="ts">
import { computed } from 'vue'
import { IS_LOADING, useLoaderStore } from '@/store/modules/loader/loader.ts'
import Loading from 'vue-loading-overlay'
import TransitionWrapper from '@/components/Shared/TransitionWrapper/TransitionWrapper.vue'
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'

const loaderStore = useLoaderStore()

const isLoading = computed(() => loaderStore[IS_LOADING])
</script>

<template>
  <loading v-model:active="isLoading" />
  <main-nav />
  <router-view #default="{ Component }">
    <transition-wrapper>
      <component :is="Component" />
    </transition-wrapper>
  </router-view>
</template>
