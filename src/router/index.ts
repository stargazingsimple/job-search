import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './routes/home'
import jobResultsRoutes from './routes/job-results'
import teamsRoutes from './routes/teams'
import notFoundRoutes from './routes/not-found'

const routes = [homeRoutes, ...jobResultsRoutes, teamsRoutes, notFoundRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' }
  },
})

export default router
