import Vue from "vue";
import Router from "vue-router";
import Portfolio from "../components/Portfolio"
import About from "../components/About"
import Enquiries from "../components/Enquiries"
import Resume from "../components/Resume"
import Gallery from "../components/Gallery"
import Project from "../components/Project"
import LoginRegister from "@/components/Login/LoginRegister";
import AdminProject from "../components/Admin/AdminProject";
import AdminPortfolio from "../components/Admin/AdminPortfolio";
import AdminGallery from "../components/Admin/AdminGallery";
import AdminAbout from "../components/Admin/AdminAbout";
import AdminEnquiries from "../components/Admin/AdminEnquiries";
import AdminResume from "../components/Admin/AdminResume";
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
         if (to.name === "Login" && store.state.user.userSignedIn) next({ name: "AdminPortfolio" });
         else next();
      }
    },
    {
      path: "/admin/project/:sectionId/:projectId",
      name: "AdminProject",
      component: AdminProject,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.name === "AdminProject" && !store.state.user.userSignedIn) next({ name: "Login" });
        else next();
     }
    },
    {
      path: "/admin/portfolio",
      name: "AdminPortfolio",
      component: AdminPortfolio,
      beforeEnter: (to, from, next) => {
        if (to.name === "AdminPortfolio" && !store.state.user.userSignedIn) next({ name: "Login" });
        else next();
     }
    },
    {
      path: "/admin/gallery",
      name: "AdminGallery",
      component: AdminGallery,
      beforeEnter: (to, from, next) => {
        if (to.name === "AdminGallery" && !store.state.user.userSignedIn) next({ name: "Login" });
        else next();
     }
    },
    {
      path: "/admin/about",
      name: "AdminAbout",
      component: AdminAbout,
      beforeEnter: (to, from, next) => {
        if (to.name === "AdminAbout" && !store.state.user.userSignedIn) next({ name: "Login" });
        else next();
     }
    },
    {
      path: "/admin/enquiries",
      name: "AdminEnquiries",
      component: AdminEnquiries,
      beforeEnter: (to, from, next) => {
        if (to.name === "AdminEnquiries" && !store.state.user.userSignedIn) next({ name: "Login" });
        else next();
      }
    },
    {
      path: "/admin/resume",
      name: "AdminResume",
      component: AdminResume,
      beforeEnter: (to, from, next) => {
        if (to.name === "AdminResume" && !store.state.user.userSignedIn) next({ name: "Login" });
        else next();
      }
    },
  ],
  scrollBehavior() {
    window.scrollTo(0,0);
  }
});

export default router;
