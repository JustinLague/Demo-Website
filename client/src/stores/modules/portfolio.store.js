import { sectionService } from "../../services/section.services";
import _ from 'lodash';  

/* eslint-disable no-console */
const state = {
  sections: [],
  
};

const getters = {
};

const actions = { 
  async initSections({ commit }) {
    const sections = await sectionService.init();
    commit("INIT_SECTIONS", sections.data);
  },
};

const mutations = {
  INIT_SECTIONS(state, data) {
    data.forEach(section => {
      section.metaProjects = _.sortBy(section.metaProjects, ["index"]);
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