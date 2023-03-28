import { createApp } from 'vue'
import VueRoot from './VueRoot.jsx'
import router from './router'

import './assets/style.css'
import './assets/main.css'

const app = createApp(VueRoot)

app.use(router)

app.mount('#app')
