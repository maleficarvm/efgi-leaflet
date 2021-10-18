import Vue from "vue";
import VueRouter from "vue-router";
import Map from "../views/Map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Map",
    component: Map,
  },
  {
    path: "/table",
    name: "Table",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue"),
  },
  {
    path: "/resources",
    name: "Resources",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Resources.vue"),
  },
  {
    path: "/info",
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Info.vue"),
  },
  {
    path: "/forecast",
    name: "Forecast",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Forecast.vue"),
  },
  {
    path: "/fund",
    name: "Fund",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Fund.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "about" */ "../views/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
