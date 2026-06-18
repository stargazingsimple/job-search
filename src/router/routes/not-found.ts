import NotFoundView from '@/views/NotFoundView/NotFoundView.vue'

export default {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: NotFoundView,
  meta: {
    needAuth: true,
    title: 'Not Found',
    layout: 'main',
  },
}
