import { dashboardService } from "../../services/dashboard.services";
import { sectionService } from "../../services/section.services";
import { galleryService } from "../../services/gallery.services";
import _ from 'lodash'; 

/* eslint-disable no-console */
const state = {
    serverError: null,
    saving: false,
    sections: [],
    galleryImages: []
};

const getters = {
    getSections(state) {
        return state.sections;
    },
    getGalleryImages(state) {
        return state.galleryImages;
    }
};

const actions = { 
    async initGallery({ dispatch, commit}) {
        try {
            var galleryImages = await galleryService.init();

            commit("INIT_GALLERY", galleryImages.data);
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
    async initSections({ dispatch, commit }) {
        try {
            var sections = await sectionService.init();

            commit("INIT_SECTIONS", sections.data);
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
    async addProjectToSection({ commit }, payload) {
        commit("ADD_PROJECT_TO_SECTION", payload);
    },
    async addSection({ commit }) {
        commit("ADD_SECTION");
    },
    async updateSectionTitle({ commit }, payload) {
        commit("UPDATE_SECTION_TITLE", payload);
    },
    async removeProjectFromSection({ commit }, payload) {
        commit("REMOVE_PROJECT_FROM_SECTION", payload);
    },
    async removeSection({ commit }, payload) {
        commit("REMOVE_SECTION", payload);
    },
    async saveSections({ commit, dispatch, getters }) {
        commit("TRYING_SAVE");
        try {
            let sections = await dashboardService.saveSections({sections: getters.getSections});

            commit("REMOVE_TEMP");
            
            commit("INIT_SECTIONS", sections.data);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            } else {
                const serverError = err.response.data.error;
                commit("SERVER_ERROR", serverError);
            }
        }
        finally {
            commit("SAVED");
        }
    },
    async moveProjectUp({ commit }, payload) {
        commit("MOVE_PROJECT_UP", payload);
    },
    async moveProjectDown({ commit }, payload) {
        commit("MOVE_PROJECT_DOWN", payload);
    },
    async moveImage({ commit }, payload) {
        commit("MOVE_IMAGE", payload);
    },
    async updateIndex({ commit, getters, dispatch }) {
        commit("TRYING_SAVE");
        try {
            await dashboardService.updateIndex({images: getters.getGalleryImages});

            commit("SAVED");
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            } else {
                const serverError = err.response.data.error;
                commit("SERVER_ERROR", serverError);
            }
        }
    },
    async updateProjectId({ commit }, payload){
        commit("UPDATE_PROJECT_ID", payload);
    }
};

const mutations = {
    TRYING_SAVE(state) {
        state.saving = true; 
    },
    SAVED(state) {
        state.saving = false;
    },
    SERVER_ERROR(state, serverError) {
        state.serverError = serverError;
    },
    INIT_GALLERY(state, galleryImages){
        state.galleryImages = _.sortBy(galleryImages, ["index"]);
        
        state.galleryImages.forEach((image) => {
            image.thumnailUrl = process.env.VUE_APP_API_URL + "/image/" + image.thumbnail;
            image.detailedImageUrl = process.env.VUE_APP_API_URL + "/image/" + image.detailedImage;  
        })
    },
    INIT_SECTIONS(state, sections) {
        sections = sections.map(s => ({
            ...s,
            visible: true
        }));

        state.sections.forEach(section => {
            if (section.status == "NEW")
                sections.push(section);
            
            if (section.status == "UPDATED") {
                let index = sections.findIndex(s => s._id === section._id)
                sections.splice(index, 1, section);
            }
        });

        state.sections = sections;
    },
    ADD_SECTION(state) {
        let randomId = "NEW" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its a unique ID
        while (state.sections.find(section => section._id === randomId) != undefined) {
            randomId = "NEW" + Math.floor(Math.random() * 10000000000); 
        }
        
        let newSection = { _id: randomId, status: "NEW", title: ["Sans titre", "Untitled"], metaProjects: [], visible: true};
        state.sections.push(newSection);
    },
    ADD_PROJECT_TO_SECTION(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section._id === payload.sectionId);

        if (state.sections[sectionIndex].metaProjects.find(metaProject => metaProject.projectId === payload.projectId) !== undefined) {
            return
        }
        
        let randomId = "NEW" + Math.floor(Math.random() * 10000000000); 

        let metaProjectIndex = state.sections[sectionIndex].metaProjects == undefined ? 0 : state.sections[sectionIndex].metaProjects.length;

        let metaProject = {_id: randomId, index: metaProjectIndex, projectId: payload.projectId};

        state.sections[sectionIndex].metaProjects.push(metaProject);
        
        if (state.sections[sectionIndex].status != "NEW")
            state.sections[sectionIndex].status = "UPDATED";
    },
    REMOVE_PROJECT_FROM_SECTION(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section._id === payload.section._id);

       _.remove(state.sections[sectionIndex].metaProjects, metaProject => metaProject.projectId === payload.projectId);

        if (state.sections[sectionIndex].status != "NEW")
            state.sections[sectionIndex].status = "UPDATED";
    },
    REMOVE_SECTION(state, payload) {
        let index = state.sections.findIndex(section => section._id === payload._id);

        if (state.sections[index].status == "NEW") {
            _.remove(state.sections, s => s._id === payload._id);
        }
        else {
            state.sections[index].status = "REMOVED";
            state.sections[index].visible = false;
        }

    },
    REMOVE_TEMP(state) {
        state.sections = state.sections.filter(section => {
            return section.status !== "NEW" && section.status !== "UPDATED";
        });
    },
    UPDATE_SECTION_TITLE(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section._id === payload.sectionId);
        
        switch(payload.lang) {
            case("fr"):
                state.sections[sectionIndex].title[0] = payload.title;
                break;
            case("en"):
                state.sections[sectionIndex].title[1] = payload.title;
                break;
        }
        
        if (state.sections[sectionIndex].status != "NEW")
            state.sections[sectionIndex].status = "UPDATED";
    },
    MOVE_PROJECT_UP(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section._id === payload.sectionId);
       
        state.sections[sectionIndex].metaProjects[payload.index].index--;

        state.sections[sectionIndex].metaProjects[payload.index - 1].index++; 

        state.sections[sectionIndex].metaProjects = _.sortBy(state.sections[sectionIndex].metaProjects, ["index"]);

        if (state.sections[sectionIndex].status != "NEW")
            state.sections[sectionIndex].status = "UPDATED";
    },
    MOVE_PROJECT_DOWN(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section._id === payload.sectionId);
       
        state.sections[sectionIndex].metaProjects[payload.index].index++;

        state.sections[sectionIndex].metaProjects[payload.index + 1].index--;

        state.sections[sectionIndex].metaProjects = _.sortBy(state.sections[sectionIndex].metaProjects, ["index"]);

        if (state.sections[sectionIndex].status != "NEW")
            state.sections[sectionIndex].status = "UPDATED";
    },
    MOVE_IMAGE(state, payload) {
        state.galleryImages[payload.prevIndex].index = payload.newIndex;

        state.galleryImages[payload.newIndex].index = payload.prevIndex;
        
        state.galleryImages = _.sortBy(state.galleryImages, ["index"]);
    },
    UPDATE_PROJECT_ID(state, payload) {
        var sectionIndex = [];
        state.sections.forEach(section => {
            if(section.metaProjects.find(metaproject => metaproject.projectId === payload.oldId))
                sectionIndex.push(state.sections.findIndex(s => s._id === section._id));
        });

        sectionIndex.forEach (index => {
            let indexProject = state.sections[index].metaProjects.findIndex(metaproject => metaproject.projectId === payload.oldId);
            state.sections[index].metaProjects[indexProject].projectId = payload.newId;
        });
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};