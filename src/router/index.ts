import { createRouter, createWebHistory } from "vue-router";
import DataStructureComponent from "../components/DataStructureComponent.vue";
import DataShowComponent from "../components/DataShowComponent.vue";
import CodeListComponent from "../components/CodeListComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/dataflow/:agencyId/:id/:version/:name",
      name: "dataflow-detail",
      component: () => DataShowComponent,
      props: true,
    },
    {
      path: "/dsd/:agencyId/:id",
      name: "dsd-detail",
      component: () => DataStructureComponent,
      props: true,
    },
    {
      path: "/dsd/:agencyId/codelist/:structure",
      name: "dsd-codelist",
      component: () => CodeListComponent,
      props: true,
    },
  ],
});
export default router;
