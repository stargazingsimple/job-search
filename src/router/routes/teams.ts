export default {
  path: '/teams',
  name: 'teams',
  component: () => import('@/views/TeamsView/TeamsView.vue'),
  meta: {
    needAuth: true,
    title: 'Teams',
    layout: 'main',
  },
}
