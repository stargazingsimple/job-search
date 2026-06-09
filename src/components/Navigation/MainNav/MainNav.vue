<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'
import TheSubNav from '@/components/Navigation/TheSubNav/TheSubNav.vue'

const NAV_ITEMS = [
  {
    title: 'Jobs',
    link: '/job/results',
  },
  {
    title: 'Teams',
    link: '/teams',
  },
]

const route = useRoute()

const showSubNav = computed(() => route.name === 'job-results')
</script>

<template>
  <header :class="['w-full', 'text-sm', 'h-32']">
    <div class="fixed top-0 left-0 z-10 h-16 w-full bg-white">
      <div class="border-brand-gray-1 mx-auto flex h-full flex-nowrap border-b border-solid px-8">
        <router-link to="/" class="flex h-full items-center text-xl">Careers</router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="{ title, link } in NAV_ITEMS" :key="title" class="ml-9 h-full first:ml-0">
              <router-link :to="link" class="flex h-full items-center py-2.5">
                {{ title }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <base-button text="Log out" />
        </div>
      </div>
      <the-sub-nav v-if="showSubNav" />
    </div>
  </header>
</template>
