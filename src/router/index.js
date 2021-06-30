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
    name: "Recources",
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
];

const router = new VueRouter({
  routes,
});

export default router;
