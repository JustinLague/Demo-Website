import { portfolioService } from "../../services/portfolio.services";

/* eslint-disable no-console */
const state = {
  projects: [],
  
};

const getters = {
};

const actions = { 
  async initPortfolio({ commit }) {
    const projects = await portfolioService.get();
    commit("INIT_PORTFOLIO", projects.data);
  },
};

const mutations = {
  INIT_PORTFOLIO(state, data) {
    state.projects = data.projects;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
