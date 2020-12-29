import Vue from "vue";
import Router from "vue-router";
import Portfolio from "../components/Portfolio"
import About from "../components/About"
import Enquiries from "../components/Enquiries"
import Gallery from "../components/Gallery"
import Project from "../components/Project"


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Portfolio",
      component: Portfolio,
    },
    {
      path: "/Gallery",
      name: "Gallery",
      component: Gallery
    },
    {
      path: "/About",
      name: "About",
      component: About
    },
    {
      path: "/Enquiries",
      name: "Enquiries",
      component: Enquiries
    },
    {
      path: "/Project/:id",
      name: "Project",
      component: Project,
    }
  ]
});

export default router;
