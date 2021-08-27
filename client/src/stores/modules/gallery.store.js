import { galleryService } from "../../services/gallery.services";
import _ from 'lodash';

/* eslint-disable no-console */
const state = {
    galleryImages: [],
  
};

const getters = {
};

const actions = { 
  async initGallery({ commit }) {
    const gallery = await galleryService.init();
    commit("INIT_GALLERY", gallery.data);
  },
};

const mutations = {
    INIT_GALLERY(state, galleryImages) {
    state.galleryImages = _.sortBy(galleryImages, ["index"]);
    
    state.galleryImages.forEach((image) => {
        image.thumbnailUrl = process.env.VUE_APP_API_URL + "/image/" + image.thumbnail;
        image.detailedImageUrl = process.env.VUE_APP_API_URL + "/image/" + image.detailedImage;  
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
