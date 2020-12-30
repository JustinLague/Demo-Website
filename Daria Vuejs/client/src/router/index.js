import Vue from "vue";
import Router from "vue-router";
import Portfolio from "../components/Portfolio"
import About from "../components/About"
import Enquiries from "../components/Enquiries"
import Gallery from "../components/Gallery"
import Project from "../components/Project"
import LoginRegister from "@/components/Login/LoginRegister";
import Dashboard from "../components/Admin/Dashboard"
import store from "../stores/store";

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
      path: "/Project/:projectId",
      name: "Project",
      component: Project,
      props: true 
    },
    {
      path: "/Login",
      name: "Login",
      component: LoginRegister,
      beforeEnter: (to, from, next) => {
         if (to.name === "Login" && store.state.user.userSignedIn) next({ name: "Dashboard" });
         else next();
      }
    },
    {
      path: "/Dashboard/",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
         if (to.name === "Dashboard" && !store.state.user.userSignedIn) next({ name: "Login" });
         else next();
      }
    },
  ]
});

export default router;
