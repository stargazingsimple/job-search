<script setup lang="ts">
import { useUserStore } from '@/store/modules/user/user.ts'
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <base-button
        text="Clear Filters"
        type="secondary"
        @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
      />
    </div>
  </div>
</template>
