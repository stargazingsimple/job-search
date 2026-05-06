<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
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
  },
  emits: ['update:modelValue'],
}
</script>

<template>
  <div class="relative flex h-full flex-1 items-center">
    <label :for="id" class="absolute -top-10 left-0 -z-10">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      :name="id"
      :placeholder="placeholder"
      type="text"
      class="w-full text-lg font-normal focus:outline-none"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span
      v-if="errorMessage"
      class="text-brand-red-1 absolute top-12 left-0"
      data-test="error-message"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
