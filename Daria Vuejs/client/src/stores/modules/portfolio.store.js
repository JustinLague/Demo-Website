import { portfolioService } from "../../services/portfolio.services";

/* eslint-disable no-console */
const state = {
  portfolios: [],
  
};

const getters = {
};

const actions = { 
  async initPortfolio({ commit }) {
    const portfolios = await portfolioService.get();
    commit("INIT_PORTFOLIO", portfolios.data);
  },
};

const mutations = {
  INIT_PORTFOLIO(state, data) {
    state.portfolios = data.portfolio;
    
    console.log(state.portfolios)

    state.portfolios.forEach((portfolio) => {
        console.log(portfolio)
        portfolio.image.url = process.env.VUE_APP_API_URL + "/image/" + portfolio.image.id   
    })
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
