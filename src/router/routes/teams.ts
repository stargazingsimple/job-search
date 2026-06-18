import TeamsView from '@/views/TeamsView/TeamsView.vue'

export default {
  path: '/teams',
  name: 'teams',
  component: TeamsView,
  meta: {
    needAuth: true,
    title: 'Teams',
    layout: 'main',
  },
}
