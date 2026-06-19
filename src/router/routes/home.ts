export default {
  path: '/',
  name: 'home',
  component: () => import('@/views/HomeView/HomeView.vue'),
  meta: {
    needAuth: true,
    title: 'Home',
    layout: 'main',
  },
}
