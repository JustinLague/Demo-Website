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


const vueLocalStorage = new VuexPersist({
  key: "STORAGE_KEY",
  storage: window.sessionStorage,
  reducer: (state) => ({
    user: {
      user: state.user.username,
      token: state.user.token,
      userSignedIn: state.user.userSignedIn
    }
  })
});

export default new Vuex.Store({
  modules: {
    portfolio,
    project,
    user,
    dashboard,
    gallery
  },
  plugins: [vueLocalStorage.plugin],
  strict: debug
});
