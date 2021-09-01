import { aboutService } from "../../services/about.services";

/* eslint-disable no-console */
const state = {
    about: {},
    loaded: false,
    saving: false,
};

const getters = {
    getAbout(state) {
        return state.about;
    },
};

const actions = { 
    async initAbout({ commit, dispatch }) {
        try {
            const about = await aboutService.init();

            commit("INIT_ABOUT", about.data);
		} catch (err) {
			console.error(err)
				if (err.response && err.response.status === 403) {
				dispatch('user/logout', null, { root: true })
			} else {
				const serverError = err.response.data.error;
				commit("LOGIN_ERROR", serverError);
			}
		}
    },
    async updateDescription({ commit }, payload) {
        commit("UPDATE_DESCRIPTION", payload);	
    },
    async updateImage({ commit }, payload) {
        commit("UPDATE_IMAGE", payload);	
    },
    async saveAbout({ commit, dispatch, getters}) {
        commit("TRYING_SAVE");
        try {
            let about = getters.getAbout

            console.log(about);

            let formData = new FormData();

            formData.append('descriptionFR', about.description[0]);
            formData.append('descriptionEN', about.description[1]);
            
            if (about.image !== undefined) {
                formData.append('image', about.image.dataImage);
            }

            await aboutService.updateAbout(formData);
		} catch (err) {
			console.error(err)
				if (err.response && err.response.status === 403) {
				dispatch('user/logout', null, { root: true })
			} else {
				const serverError = err.response.data.error;
				commit("LOGIN_ERROR", serverError);
			}
		}
        finally {
            commit("SAVED");
        }
    }
};

const mutations = {
    TRYING_SAVE(state) {
        state.saving = true; 
    },
    SAVED(state) {
        state.saving = false;
    },
    INIT_ABOUT(state, about) {
        state.about.imageURL = process.env.VUE_APP_API_URL + "/image/" + about.image;
        state.about.description = about.description;

        state.loaded = true;
    },
    UPDATE_DESCRIPTION(state, payload) {
        switch(payload.lang) {
			case("fr"):
				state.about.description[0] = payload.value;
				break;
			case("en"):
                state.about.description[1] = payload.value;
				break;
		}
    },
    UPDATE_IMAGE(state, payload) {
        state.loaded = false;

        state.about.image = payload.image;
        state.about.imageURL = payload.image.imageUrl;

        state.loaded = true;
    },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
