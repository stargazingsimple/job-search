import { createApp } from 'vue'
import '@/styles/main.css'
import router from '@/router/index'
import store from '@/store/index'
import FontAwesomeIcon from '@/plugins/font-awesome.ts'
import LoadingPlugin from '@/plugins/loading-plugin.ts'
import Toast, { options } from '@/plugins/toast.ts'
import App from '@/App/App.vue'

const app = createApp(App)

app.use(LoadingPlugin)
app.use(Toast, options)
app.use(store)
app.use(router)

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
