import HomeView from '@/views/HomeView/HomeView.vue'

export default {
  path: '/',
  name: 'home',
  component: HomeView,
  meta: {
    needAuth: true,
    title: 'Home',
    layout: 'main',
  },
}
