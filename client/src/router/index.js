import Vue from "vue";
import Router from "vue-router";
import Portfolio from "../components/Portfolio"
import About from "../components/About"
import Enquiries from "../components/Enquiries"
import Resume from "../components/Resume"
import Gallery from "../components/Gallery"
import Project from "../components/Project"
import LoginRegister from "@/components/Login/LoginRegister";
import Dashboard from "../components/Admin/Dashboard"
import AddProject from "../components/Admin/AddProject"
import AddPortfolio from "../components/Admin/AddPortfolio"
import store from "../stores/store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/Portfolio",
      name: "Portfolio",
      component: Portfolio,
    },
    {
      path: "/",
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
      path: "/resume",
      name: "resume",
      component: Resume
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
    {
      path: "/admin/project",
      name: "addProject",
      component: AddProject
    },
    {
      path: "/admin/portfolio",
      name: "addPortfolio",
      component: AddPortfolio
    },
  ],
  scrollBehavior() {
    window.scrollTo(0,0);
  }
});

export default router;
