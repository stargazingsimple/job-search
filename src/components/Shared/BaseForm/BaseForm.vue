<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import TextInput from '@/components/Shared/TextInput/TextInput.vue'
import type { PropType } from 'vue'

interface FieldType {
  id: string
  initialValue: string
  label: string
  placeholder: string
  type: string
}

const props = defineProps({
  fields: {
    type: Array as PropType<FieldType[]>,
    required: true,
  },
  submitButtonText: {
    type: String,
    default: 'Submit',
  },
  validationSchema: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const { validate, values } = useForm({ validationSchema: props.validationSchema })

const fields = props.fields.map((field) => {
  const { value, errorMessage } = useField(field.id, undefined, {
    initialValue: field.initialValue,
  })

  return { fieldValue: value, errorMessage, ...field }
})

const handleSubmit = async () => {
  const { valid } = await validate()

  if (valid) {
    emit('submit', values)
  }
}
</script>

<template>
  <form class="mx-auto max-w-sm" @submit.prevent="handleSubmit">
    <text-input
      v-for="{ id, placeholder, fieldValue, errorMessage, label, type } in fields"
      :id="id"
      :key="id"
      v-model="fieldValue.value"
      :label="label"
      :placeholder="placeholder"
      :type="type"
      :error-message="errorMessage.value"
      class="rounded border px-4"
    />
    <button
      type="submit"
      class="mt-7 w-full cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {{ submitButtonText }}
    </button>
  </form>
</template>
