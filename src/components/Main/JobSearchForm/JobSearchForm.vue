<script setup>
import BaseButton from '@/components/UI/BaseButton/BaseButton.vue'
</script>

<template>
  <form class="border-brand-gray-3 flex h-12 w-full items-center rounded-3xl border border-solid">
    <fa-icon icon="search" class="mr-3 ml-4" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="" class="absolute -top-10 left-0">Role</label>
        <input
          type="text"
          placeholder="Software engineer"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>
      <span
        class="border-brand-gray-3 bg-brand-gray-2 flex h-full items-center border-r border-l px-3"
      >
        in
      </span>
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="" class="absolute -top-10 left-0">Where?</label>
        <input
          type="text"
          placeholder="Los Angeles"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>
    </div>
    <base-button type="secondary" text="Search" class="rounded-r-3xl" />
  </form>
</template>
