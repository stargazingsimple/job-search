<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IS_LOADING, useLoaderStore } from '@/store/modules/loader/loader.ts'
import { useAuthStore } from '@/store/modules/auth/auth.ts'
import Loading from 'vue-loading-overlay'
import MainLayout from '@/components/Layouts/MainLayout/MainLayout.vue'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout.vue'

const route = useRoute()
const router = useRouter()
const loaderStore = useLoaderStore()
const authStore = useAuthStore()

const isLoading = computed(() => loaderStore[IS_LOADING])
const layout = computed(() => (route.meta.layout === 'main' ? MainLayout : AuthLayout))

watch(
  () => authStore.isAuthenticated,
  (value) => {
    if (!value) {
      router.replace({ name: 'sign-in' })
    }
  },
)

onMounted(() => {
  authStore.autologin()
})
</script>

<template>
  <loading v-model:active="isLoading" />
  <component :is="layout" />
</template>
