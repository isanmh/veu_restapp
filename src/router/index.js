import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Edit from "../views/contacts/Edit.vue";
import Index from "../views/contacts/Index.vue";

const routes = [
  {
    path: "/",
    name: "contacts.index",
    component: Index,
  },
  {
    path: "/create",
    name: "contacts.create",
    component: () => import("../views/contacts/Create.vue"),
  },
  {
    path: "/edit/:id",
    name: "contacts.edit",
    component: Edit,
  },
  // 404
  {
    // path: "/:pathMatch(.*)*",
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
