<script setup lang="ts">
import { computed } from 'vue'
import { IS_LOADING, useLoaderStore } from '@/store/modules/loader/loader.ts'
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'
import Loading from 'vue-loading-overlay'

const loaderStore = useLoaderStore()

const isLoading = computed(() => loaderStore[IS_LOADING])
</script>

<template>
  <loading v-model:active="isLoading" />
  <main-nav />
  <router-view />
</template>
