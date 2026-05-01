<script>
import TheHeadline from '@/components/JobSearch/TheHeadline/TheHeadline.vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm/JobSearchForm.vue'
import SpotlightsList from '../SpotlightsList/SpotlightsList.vue'
import SpotlightsListItem from '../SpotlightsListItem/SpotlightsListItem.vue'

export default {
  name: 'TheHero',
  components: { TheHeadline, JobSearchForm, SpotlightsList, SpotlightsListItem },
}
</script>

<template>
  <main class="flex h-screen flex-col">
    <section class="flex h-screen flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>
        <div class="col-span-5 col-start-2">
          <the-headline />
          <job-search-form />
        </div>
        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
            alt="vue-logo"
            class="h-80 w-80 object-contain"
          />
        </div>
        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>
    <spotlights-list class="flex flex-row justify-center pb-16">
      <template #default="{ title, description, img }">
        <spotlights-list-item :title="title" :description="description" :img="img" />
      </template>
    </spotlights-list>
  </main>
</template>
