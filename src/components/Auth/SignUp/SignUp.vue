<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth/auth.ts'
import validationSchema from '@/utils/validation/schemas/sign-up'
import BaseForm from '@/components/Shared/BaseForm/BaseForm.vue'
import type { AuthData } from '@/api/auth/types.ts'

const fields = [
  {
    id: 'email',
    initialValue: '',
    label: 'Email',
    placeholder: 'Enter your email address',
    type: 'email',
  },
  {
    id: 'fullName',
    initialValue: '',
    label: 'Full name',
    placeholder: 'Enter your full name',
    type: 'text',
  },
  {
    id: 'password',
    initialValue: '',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
]

const router = useRouter()
const authStore = useAuthStore()

const onSubmit = async (formData: AuthData) => {
  const res = await authStore.signUp(formData)
  if (res) {
    router.replace({ name: 'sign-in' })
  }
}
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-center text-2xl font-bold text-slate-900 uppercase">register</h1>
    </div>
    <base-form
      :validation-schema="validationSchema"
      :fields="fields"
      submit-button-text="register"
      @submit="onSubmit"
    />
    <div class="mt-6 flex flex-col text-center text-sm text-slate-900">
      Already have an account?
      <router-link
        to="/auth/sign-in"
        class="ml-1 rounded font-medium text-blue-500 uppercase hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        sign in
      </router-link>
    </div>
  </div>
</template>
