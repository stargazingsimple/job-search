import JobResultsView from '@/views/JobResultsView/JobResultsView.vue'
import JobView from '@/views/JobView/JobView.vue'

export default [
  {
    path: '/job/results',
    name: 'job-results',
    component: JobResultsView,
    meta: {
      needAuth: true,
      title: 'Jobs',
      layout: 'main',
    },
  },
  {
    path: '/job/results/:id',
    name: 'job',
    component: JobView,
    props: true,
    meta: {
      needAuth: true,
      title: 'Job Details',
      layout: 'main',
    },
  },
]
