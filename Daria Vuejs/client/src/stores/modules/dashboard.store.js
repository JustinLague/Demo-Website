import { dashboardService } from "../../services/dashboard.services";

/* eslint-disable no-console */
const state = {
    nbImages: 0
};

const getters = {
};

const actions = { 
  async initDashboard({ commit, dispatch }) {
    try {
        const dashboard = await dashboardService.get();
    
        commit("INIT_DASHBOARD", dashboard.data);
    }catch (err) {
        if (err.response.status === 403) {
            dispatch('user/logout', null, { root: true })
        }
        commit("EMPTY_DASHBOARD");
    }
  },
};

const mutations = {
    INIT_DASHBOARD(state, data) {
    state.nbImages = data.nbImages;
  },
  EMPTY_DASHBOARD(state) {
    state.nbImages = 0; 
  }
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
