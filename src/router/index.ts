import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth/auth.ts'
import homeRoutes from './routes/home'
import jobResultsRoutes from './routes/job-results'
import teamsRoutes from './routes/teams'
import authRoutes from './routes/auth'
import notFoundRoutes from './routes/not-found'

const routes = [homeRoutes, ...jobResultsRoutes, teamsRoutes, authRoutes, notFoundRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()

  document.title = `Careers | ${to.meta.title}`

  if (to.meta.needAuth && !authStore.isAuthenticated) {
    next('/auth/sign-in')
  } else if ((to.name === 'sign-in' || to.name === 'sign-up') && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
