import { createApp } from 'vue';
import App from './App.vue'
import "./assets/bookcase.css";
import store from './store';
import router from "./router";
import fonts from "./utils/fonts";
import { msalInstance } from './authConfig';


const app = createApp(App)
  .use(store)
  .use(router)
  .use(fonts);

// Waiting for the router to be ready prevents race conditions when returning from a loginRedirect or acquireTokenRedirect 
router.isReady().then(() => {
  app.mount('#app');
});
