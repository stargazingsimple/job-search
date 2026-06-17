import { createRouter, createWebHistory } from 'vue-router'
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

export default router
