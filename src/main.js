import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import auth from './plugins/auth'
import VueAxios from 'vue-axios'

import './assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(auth)
app.use(router)
app.use(VueAxios, axios)

app.config.globalProperties.$filters = {
  description(value, length) {
    if (value.length > 30) {
      return value.substring(0, length) + '...'
    } else {
      return value
    }
  }
}

app.mount('#app')
