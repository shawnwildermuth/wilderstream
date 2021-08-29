import { createApp } from 'vue'
import App from './App.vue'
import "./assets/bookcase.css";
import store from './store';
import router from "./router";

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
