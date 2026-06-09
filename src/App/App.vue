<script setup lang="ts">
import { computed } from 'vue'
import { IS_LOADING, useLoaderStore } from '@/store/modules/loader/loader.ts'
import { useRoute } from 'vue-router'
import Loading from 'vue-loading-overlay'
import MainLayout from '@/components/Layouts/MainLayout/MainLayout.vue'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout.vue'

const route = useRoute()
const loaderStore = useLoaderStore()

const isLoading = computed(() => loaderStore[IS_LOADING])
const layout = computed(() => (route.meta.layout === 'main' ? MainLayout : AuthLayout))
</script>

<template>
  <loading v-model:active="isLoading" />
  <component :is="layout" />
</template>
