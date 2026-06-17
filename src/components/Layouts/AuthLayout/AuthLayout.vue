<script setup lang="ts">
import TransitionWrapper from '@/components/Shared/TransitionWrapper/TransitionWrapper.vue'
</script>

<template>
  <main class="bg-white md:h-screen">
    <div class="grid h-full w-full items-center md:grid-cols-2">
      <div class="p-4 max-md:order-1">
        <img
          src="@/assets/signin-image.webp"
          class="mx-auto block aspect-square h-full w-full object-contain lg:max-w-3/4"
          alt="login-image"
        />
      </div>
      <div class="bg-brand-gray-1 flex h-full w-full items-center px-8 py-12 lg:p-12">
        <div class="mx-auto w-full max-w-md">
          <router-view #default="{ Component }">
            <transition-wrapper>
              <component :is="Component" />
            </transition-wrapper>
          </router-view>
        </div>
      </div>
    </div>
  </main>
</template>
