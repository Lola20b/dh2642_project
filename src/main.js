import { createApp } from 'vue'


import './assets/style.css'
import './assets/main.css'

import {VueRoot, router} from './VueRoot.jsx'

// 3rd party component notifications
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// toast options
const options = {

};

const app = createApp(VueRoot)

app.use(Toast, options);
app.use(router)


app.mount('#app')
