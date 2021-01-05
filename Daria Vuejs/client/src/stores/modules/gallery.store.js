import { galleryService } from "../../services/gallery.services";

/* eslint-disable no-console */
const state = {
    galleryImages: [],
  
};

const getters = {
};

const actions = { 
  async initGallery({ commit }) {
    const gallery = await galleryService.get();
    commit("INIT_GALLERY", gallery.data);
  },
};

const mutations = {
    INIT_GALLERY(state, data) {
    state.galleryImages = data;
    
    state.galleryImages.forEach((image) => {
        image.url = process.env.VUE_APP_API_URL + "/image/" + image.id   
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
