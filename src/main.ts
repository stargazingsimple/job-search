import { createApp } from 'vue'
import '@/styles/main.css'
import router from '@/router/index'
import store from '@/store'
import FontAwesomeIcon from '@/plugins/font-awesome.ts'
import App from '@/App/App.vue'

const app = createApp(App)

app.use(store)
app.use(router)

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
