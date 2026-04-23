<script>
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage/ProfileImage.vue'
import TheSubNav from '@/components/Navigation/TheSubNav/TheSubNav.vue'

export default {
  name: 'MainNav',
  components: {
    TheSubNav,
    ProfileImage,
    BaseButton,
  },
  data() {
    return {
      items: [
        {
          title: 'Jobs',
          link: '/job/results',
        },
      ],
      isLoggedIn: false,
    }
  },
  computed: {
    headerHeightClass() {
      return this.isLoggedIn ? 'h-32' : 'h-16'
    },
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true
    },
  },
}
</script>

<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div class="border-brand-gray-1 mx-auto flex h-full flex-nowrap border-b border-solid px-8">
        <router-link to="/" class="flex h-full items-center text-xl">Careers</router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="{ title, link } in items" :key="title" class="ml-9 h-full first:ml-0">
              <router-link :to="link" class="flex h-full items-center py-2.5">
                {{ title }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <base-button v-else text="Sign in" @click="loginUser" />
        </div>
      </div>
      <the-sub-nav v-if="isLoggedIn" />
    </div>
  </header>
</template>
