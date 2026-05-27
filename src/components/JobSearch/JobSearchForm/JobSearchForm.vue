<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import entity from '@/utils/entities/job-search'
import validationSchema from '@/utils/validation/schemas/job-search'
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'
import TextInput from '@/components/Shared/TextInput/TextInput.vue'

const router = useRouter()
const { validate, values } = useForm({ validationSchema })

const fields = entity.map(({ fieldName, initialValue }) => {
  const { value, errorMessage } = useField(fieldName, undefined, {
    initialValue,
  })

  return { fieldName, fieldValue: value, errorMessage }
})

const handleSubmit = async () => {
  const { valid } = await validate()

  if (valid) {
    const { role, location } = values

    router.push({ name: 'job-results', query: { role, location } })
  }
}
</script>

<template>
  <form
    class="border-brand-gray-3 flex h-12 w-full items-center rounded-3xl border border-solid"
    @submit.prevent="handleSubmit"
  >
    <fa-icon icon="search" class="mr-3 ml-4" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <template v-for="({ fieldName, fieldValue, errorMessage }, idx) in fields" :key="fieldName">
        <text-input
          v-if="fieldName === 'role'"
          id="role"
          v-model="fieldValue.value"
          :error-message="errorMessage.value"
          placeholder="Software engineer"
          label="Role"
          class="pr-3"
        />
        <span
          v-if="idx < fields.length - 1"
          class="border-brand-gray-3 bg-brand-gray-2 flex h-full items-center border-r border-l px-3"
        >
          in
        </span>
        <text-input
          v-if="fieldName === 'location'"
          id="location"
          v-model="fieldValue.value"
          :error-message="errorMessage.value"
          placeholder="Los Angeles"
          label="Where?"
          class="pl-3"
        />
      </template>
    </div>
    <base-button type="secondary" text="Search" class="rounded-r-3xl" />
  </form>
</template>
