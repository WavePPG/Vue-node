import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/styles.css'; // Ensure this import

const app = createApp(App);
app.use(router);
app.mount('#app');
