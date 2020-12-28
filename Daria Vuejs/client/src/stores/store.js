import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import sketcher from "./modules/sketcher.store";
import user from "./modules/user.store";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const vueLocalStorage = new VuexPersist({
  key: "STORAGE_KEY",
  storage: window.localStorage,
  reducer: (state) => ({
    user: {
      user: state.user.user,
      token: state.user.token,
      userSignedIn: state.user.userSignedIn
    }
  })
});

export default new Vuex.Store({
  modules: {
    sketcher,
    user
  },
  plugins: [vueLocalStorage.plugin],
  strict: debug
});
