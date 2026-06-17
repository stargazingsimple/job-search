<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative flex h-12 flex-1 items-center">
    <label :for="id" class="absolute -top-7 left-0">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      :name="id"
      :placeholder="placeholder"
      :type="type"
      class="w-full text-lg font-normal focus:outline-none"
      autocomplete="off"
      @input="onInput"
    />
    <span
      v-if="errorMessage"
      class="text-brand-red-1 absolute top-12 left-0 text-xs"
      data-test="error-message"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
