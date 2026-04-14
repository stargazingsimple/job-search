import { createApp } from 'vue'
import '@/styles/main.css'
import FontAwesomeIcon from '@/plugins/font-awesome.js'
import App from './App/App.vue'

const app = createApp(App)

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
