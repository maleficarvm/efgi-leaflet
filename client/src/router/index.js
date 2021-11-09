import Vue from "vue";
import VueRouter from "vue-router";
import Info from "../views/Info.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Info",
    component: Info,
  },
  {
    path: "/table",
    name: "Table",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Table.vue"),
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("../views/Map.vue"),
  },
  {
    path: "/resources",
    name: "Resources",
    component: () => import("../views/Resources.vue"),
  },
  {
    path: "/forecast",
    name: "Forecast",
    component: () => import("../views/Forecast.vue"),
  },
  {
    path: "/fund",
    name: "Fund",
    component: () => import("../views/Fund.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
