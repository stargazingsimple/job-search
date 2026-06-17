import SignIn from '@/components/Auth/SignIn/SignIn.vue'
import SignUp from '@/components/Auth/SignUp/SignUp.vue'

export default {
  name: 'auth',
  path: '/auth',
  children: [
    {
      name: 'sign-in',
      path: 'sign-in',
      component: SignIn,
    },
    {
      name: 'sign-up',
      path: 'sign-up',
      component: SignUp,
    },
  ],
  meta: {
    layout: 'auth',
  },
}
