<script setup lang="ts">
import validationSchema from '@/utils/validation/schemas/sign-in'
import BaseForm from '@/components/Shared/BaseForm/BaseForm.vue'

const fields = [
  {
    id: 'email',
    initialValue: '',
    label: 'Email',
    placeholder: 'Enter your email address',
    type: 'email',
  },
  {
    id: 'password',
    initialValue: '',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
]
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-center text-2xl font-bold text-slate-900 uppercase">sign in</h1>
    </div>
    <base-form
      :validation-schema="validationSchema"
      :fields="fields"
      submit-button-text="sign in"
    />
    <div class="mt-6 flex flex-col text-center text-sm text-slate-900">
      Don't have an account yet?
      <router-link
        to="/auth/sign-up"
        class="ml-1 rounded font-medium text-blue-500 uppercase hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        sign up
      </router-link>
    </div>
  </div>
</template>
