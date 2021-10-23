import { createApp } from 'vue';
import App from './App.vue'
import "./assets/bookcase.css";
import store from './store';
import router from "./router";
import fonts from "./utils/fonts";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(fonts)
  .mount('#app')
