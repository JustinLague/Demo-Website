import { projectService } from "../../services/project.services";

/* eslint-disable no-console */
const state = {
  project: { 
    title : [],
    description: [],
    artDescription: []
  },
  images: []
};

const getters = {
};

const actions = { 
  async initProject({ commit }, id) {
    try {
      const project = await projectService.get(id);
      commit("INIT_PROJECT", project.data);
    }catch (err) {
      commit("EMPTY_PROJECT");
    }
  },
};

const mutations = {
  INIT_PROJECT(state, data) {
    state.project.title = data.project.title;
    state.project.description = data.project.description;
    state.project.artDescription = data.project.artDescription;
    state.images = data.images;
    
    data.images.forEach((image) => {
      image.thumnailUrl = process.env.VUE_APP_API_URL + "/image/" + image.thumbnail;
      image.detailedImageUrl = process.env.VUE_APP_API_URL + "/image/" + image.detailedImage;  
    })
  },
  EMPTY_PROJECT(state) {
    state.project = null; 
    state.images = [];
  }
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
