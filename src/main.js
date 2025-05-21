import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TelegramPlugin from './plugins/telegram';

const app = createApp(App);
app.use(TelegramPlugin);
app.mount('#app');
