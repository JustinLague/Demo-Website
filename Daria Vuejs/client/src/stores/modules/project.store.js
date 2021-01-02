import { projectService } from "../../services/project.services";

/* eslint-disable no-console */
const state = {
  title: "",
  artDescription: "",
  description: "",
  images: [],
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
    state.title = data.project.title;
    state.artDescription = data.project.artDescription;
    state.description = data.project.description;
    state.images = data.images;
    
    data.images.forEach((image) => {
      image.url = process.env.VUE_APP_API_URL + "/image/" + image.id   
    })
  },
  EMPTY_PROJECT(state) {
    state.title = ""; 
    state.artDescription = "";
    state.description = "";
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
