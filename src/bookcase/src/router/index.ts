// router/index.ts

import { createRouter, createWebHashHistory } from "vue-router";
import Library from "../views/Library.vue";
import Shelf from "../views/Shelf.vue";

const routes = [
  { path: "/", component: Shelf },
  { path: "/add", component: Library }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;