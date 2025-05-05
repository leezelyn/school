import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import Vant from 'vant'
import 'vant/lib/index.css'
import "@/utils/axiosConfig"

const app = createApp(App)


app.use(router)
.use(createPinia().use(piniaPersist))
.use(Vant)
.mount('#app')
