export default [
  {
    path: '/job/results',
    name: 'job-results',
    component: () => import('@/views/JobResultsView/JobResultsView.vue'),
    meta: {
      needAuth: true,
      title: 'Jobs',
      layout: 'main',
    },
  },
  {
    path: '/job/results/:id',
    name: 'job',
    component: () => import('@/views/JobView/JobView.vue'),
    props: true,
    meta: {
      needAuth: true,
      title: 'Job Details',
      layout: 'main',
    },
  },
]
