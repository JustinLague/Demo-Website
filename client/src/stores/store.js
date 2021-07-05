import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.store";
import VuexPersist from "vuex-persist";
import project from "./modules/project.store";
import portfolio from "./modules/portfolio.store";
import dashboard from "./modules/dashboard.store";
import gallery from "./modules/gallery.store";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";


const vueSessionStorage = new VuexPersist({
  key: "STORAGE_KEY",
  storage: window.sessionStorage,
  reducer: (state) => ({
    user: {
      user: state.user.username,
      token: state.user.token,
      userSignedIn: state.user.userSignedIn
    },
    dashboard: {
      projects: state.dashboard.projects,
      sections: state.dashboard.sections,
    },
  })
});


export default new Vuex.Store({
  modules: {
    project,
    user,
    portfolio,
    dashboard,
    gallery
  },
  plugins: [vueSessionStorage.plugin],
  strict: debug
});
