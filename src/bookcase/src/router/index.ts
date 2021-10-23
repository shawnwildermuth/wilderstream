// router/index.ts

import { createRouter, createWebHashHistory } from "vue-router";
import SearchView from "../views/SearchView.vue";
import ShelfView from "../views/ShelfView.vue";

const routes = [
  { path: "/", component: ShelfView },
  { path: "/add", component: SearchView }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;