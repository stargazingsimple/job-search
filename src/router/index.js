import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './routes/home'
import jobResultsRoutes from './routes/job-results'
import notFoundRoutes from './routes/not-found'

const routes = [homeRoutes, ...jobResultsRoutes, notFoundRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
