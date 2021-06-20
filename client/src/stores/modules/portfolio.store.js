import { sectionService } from "../../services/section.services";
import _ from 'lodash';  

/* eslint-disable no-console */
const state = {
  sections: [],
  
};

const getters = {
};

const actions = { 
  async initSection({ commit }) {
    const sections = await sectionService.get();
    commit("INIT_SECTION", sections.data);
  },
};

const mutations = {
  INIT_SECTION(state, data) {
    data.forEach(section => {
      section.projects = _.sortBy(section.projects, ["index"]);
    });

    state.sections = data;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};