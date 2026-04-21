<script setup>
import { reactive } from 'vue'
import { useField, useForm } from 'vee-validate'
import entity from '@/utils/entities/jobSearch.js'
import validationSchema from '@/utils/validation/schemas/jobSearch.js'
import BaseButton from '@/components/Shared/BaseButton/BaseButton.vue'
import TextInput from '@/components/Shared/TextInput/TextInput.vue'

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
      <text-input
        id="role"
        v-model="fields['role'].value"
        :error-message="fields['role'].errorMessage"
        placeholder="Software engineer"
        label="Role"
        class="pr-3"
      />
      <span
        class="border-brand-gray-3 bg-brand-gray-2 flex h-full items-center border-r border-l px-3"
      >
        in
      </span>
      <text-input
        id="location"
        v-model="fields['location'].value"
        :error-message="fields['location'].errorMessage"
        placeholder="Los Angeles"
        label="Where?"
        class="pl-3"
      />
    </div>
    <base-button type="secondary" text="Search" class="rounded-r-3xl" />
  </form>
</template>
