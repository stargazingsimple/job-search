import JobResultsView from '@/views/JobResultsView/JobResultsView.vue'
import JobView from '@/views/JobView/JobView.vue'

export default [
  {
    path: '/job/results',
    name: 'job-results',
    component: JobResultsView,
  },
  {
    path: '/job/results/:id',
    name: 'job',
    component: JobView,
    props: true,
  },
]
