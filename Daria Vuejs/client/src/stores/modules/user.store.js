/* eslint-disable no-console */
import { userService } from "../../services/user.services";
import router from "../../router";

const state = {
  user: null,
  token: null,
  userSignedIn: false,
  userTryingToLogIn: false,
  serverError: null
};

const actions = {
  async login({ commit }, credential) {
    commit("TRYING_LOGIN");
    try {
      const login = await userService.login(credential);
      if (login.status === 200) {
        commit("LOGIN", login.data);
        router.push({ name: "Sketcher" });
      }
    } catch (err) {
      const serverError = err.response.data.error;
      commit("LOGIN_ERROR", serverError);
    }
  },
  async register({ commit }, credential) {
    commit("TRYING_LOGIN");
    try {
      const login = await userService.register(credential);
      if (login.status === 200) {
        commit("LOGIN", login.data);
        router.push({ name: "Sketcher" });
      }
    } catch (err) {
      const serverError = err.response.data.error;
      commit("LOGIN_ERROR", serverError);
    }
  },
  logout({ commit }) {
    commit("LOGOUT");
    router.push({ name: "Login" });
  }
};

const mutations = {
  TRYING_LOGIN(state) {
    state.userTryingToLogIn = true;
  },
  LOGIN_ERROR(state, serverError) {
    state.serverError = serverError;
    state.userTryingToLogIn = false;
  },
  LOGIN(state, login) {
    state.user = login.user;
    state.token = login.token;
    state.userSignedIn = true;
    state.userTryingToLogIn = false;
    state.serverError = "";
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    state.userSignedIn = false;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
