import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(Toast);
app.use(pinia)
app.use(router)

app.mount('#app')
