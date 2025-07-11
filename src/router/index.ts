import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/dataflow/:agencyId/:id/:version",
      name: "dataflow-detail",
      component: () => import("../components/DataShowComponent.vue"),
      props: true,
    },
    {
      path: "/dsd/detail/:agencyId/:id",
      name: "dsd-detail",
      component: () => import("../components/DataStructureComponent.vue"),
      props: true,
    },
    {
      path: "/dsd/codelist/:agencyId/:structure",
      name: "dsd-codelist",
      component: () => import("../components/CodeListComponent.vue"),
      props: true,
    },
  ],
});
export default router;
