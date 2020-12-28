import Vue from "vue";
import Router from "vue-router";
import LoginRegister from "@/components/Login/LoginRegister";
import Sketcher from "@/components/Sketcher/Sketcher";
import store from "../stores/store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginRegister,
      beforeEnter: (to, from, next) => {
        if (to.name === "Login" && store.state.user.userSignedIn) next({ name: "Sketcher" });
        else next();
      }
    },
    {
      path: "/Sketcher",
      name: "Sketcher",
      component: Sketcher
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.state.user.userSignedIn) next({ name: "Login" });
  else next();
});

export default router;
