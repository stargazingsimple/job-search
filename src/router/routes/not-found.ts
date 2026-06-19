export default {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/NotFoundView/NotFoundView.vue'),
  meta: {
    needAuth: true,
    title: 'Not Found',
    layout: 'main',
  },
}
