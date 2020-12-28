import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.store";
import daria from "./modules/daria.store";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    daria,
    user
  },
  strict: debug
});
