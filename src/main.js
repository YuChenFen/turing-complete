import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'virtual:svg-icons-register';
import svgIcon from "./assets/icons/svgIcon.vue";
import FengUI from './components/FengUI/feng-ui'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(FengUI)
// 挂载全局组件
app.component("svg-icon", svgIcon)

app.mount('#app')
