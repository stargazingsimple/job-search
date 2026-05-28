<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user/user.ts'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion/CollapsibleAccordion.vue'

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqueValues: {
    type: Set<string>,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
})

const router = useRouter()
const userStore = useUserStore()

const selectedValues = ref<string[]>([])

userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === 'CLEAR_USER_JOB_FILTER_SELECTIONS') selectedValues.value = []
  })
})

const selectValue = () => {
  props.action(selectedValues.value)

  router.push({ name: 'job-results' })
}
</script>

<template>
  <collapsible-accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              @change="selectValue"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
