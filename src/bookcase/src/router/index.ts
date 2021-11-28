// router/index.ts

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import ShelfView from "../views/ShelfView.vue";
import FailedView from "../views/FailedView.vue";
import { registerGuard } from "./authGuard";

const routes = [
  { path: "/", component: HomeView },
  { path: "/failed", component: FailedView },
  { path: "/shelf", component: ShelfView, meta: { requiresAuth: true } },
  { path: "/add", component: SearchView, meta: { requiresAuth: true } }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

registerGuard(router);

export default router;