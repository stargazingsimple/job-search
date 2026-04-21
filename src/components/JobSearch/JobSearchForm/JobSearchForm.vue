<script setup>
import { reactive } from 'vue'
import { useField, useForm } from 'vee-validate'
import entity from '@/utils/entities/jobSearch.js'
import validationSchema from '@/utils/validation/schemas/jobSearch.js'
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'

const fields = reactive({})

const { validate, values, handleReset } = useForm({ validationSchema })

entity.forEach(({ fieldName, initialValue }) => {
  const { value, errorMessage } = useField(fieldName, undefined, {
    initialValue,
  })

  fields[fieldName] = { value, errorMessage }
})

const handleSubmit = async () => {
  const { valid } = await validate()

  if (valid) {
    console.log(values)
    handleReset()
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
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="absolute -top-10 left-0">Role</label>
        <input
          id="role"
          v-model="fields['role'].value"
          name="role"
          type="text"
          placeholder="Software engineer"
          class="w-full text-lg font-normal focus:outline-none"
        />
        <span class="text-brand-red-1 absolute top-12 left-0">
          {{ fields['role'].errorMessage }}
        </span>
      </div>
      <span
        class="border-brand-gray-3 bg-brand-gray-2 flex h-full items-center border-r border-l px-3"
      >
        in
      </span>
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="absolute -top-10 left-0">Where?</label>
        <input
          id="location"
          v-model="fields['location'].value"
          name="location"
          type="text"
          placeholder="Los Angeles"
          class="w-full text-lg font-normal focus:outline-none"
        />
        <span class="text-brand-red-1 absolute top-12 left-0">
          {{ fields['location'].errorMessage }}
        </span>
      </div>
    </div>
    <base-button type="secondary" text="Search" class="rounded-r-3xl" />
  </form>
</template>
