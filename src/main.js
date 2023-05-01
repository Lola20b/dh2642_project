import { createApp } from 'vue'
// import VueRoot from './VueRoot.jsx'
// import router from './router'

import './assets/style.css'
import './assets/main.css'

import {VueRoot, router} from './VueRoot.jsx'

const app = createApp(VueRoot)

app.use(router)

app.mount('#app')
