import { dashboardService } from "../../services/dashboard.services";
import { sectionService } from "../../services/section.services";
import { projectService } from "../../services/project.services";
import { galleryService } from "../../services/gallery.services";
import router from "../../router";
import _ from 'lodash'; 

/* eslint-disable no-console */
const state = {
    serverError: null,
    saving: false,
    projects: [],
    sections: [],
    galleryImages: []
};

const getters = {
    getSections(state) {
        return state.sections;
    },
    getProjects(state) {
        return state.projects;
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
    async initProjects({ dispatch, commit }) {
        try {
            var projects = await projectService.init();

            commit("INIT_PROJECTS", projects.data);
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
    async updateProject({ dispatch, commit }, payload) {
        try {
            var projectId = await dashboardService.updateProject({project: payload.project});
            
            await dispatch("updateImage", { images: payload.project.images, projectId: projectId.data });
            
            payload.project.id = projectId.data;
            
            commit("ADD_PROJECT", payload.project);

            commit("ADD_PROJECT_TO_SECTION", payload);
        } catch (err) {
            console.error(err)
            if (err.response && err.response.status === 403) {
                dispatch("user/logout", null, { root: true })
            } else {
                const serverError = err.response.data.error;
                commit("SERVER_ERROR", serverError);
            }
        }
    },
    async updateImage({ commit, dispatch }, imagePayload) {
        try {
            let formData = new FormData();
            let images = imagePayload.images;
            
            await Promise.all(images.map(async (image) => {
                formData = new FormData();

                formData.append('projectId', imagePayload.projectId)
                
                if (image.dataThumbnail !== undefined && image.dataImage !== undefined) {

                    formData.append('image', image.dataThumbnail);
                    formData.append('image', image.dataImage);
                    
                    await dashboardService.updateImage(formData);
                }
            }));

            router.push({ name: "AdminPortfolio" });
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
    async addProjectToSection({ commit }, payload) {
        commit("ADD_PROJECT_TO_SECTION", payload);
    },
    async addSection({ commit }) {
        commit("ADD_SECTION");
    },
    async updateSectionTitle({ commit }, payload) {
        commit("UPDATE_SECTION_TITLE", payload);
    },
    async removeProject({ commit }, payload) {
        commit("REMOVE_PROJECT", payload);
    },
    async removeSection({ commit }, payload) {
        commit("REMOVE_SECTION", payload);
    },
    async saveProjects({dispatch, getters}) {
        getters.getProjects.forEach(project => {
           dispatch("updateProject", project);
        }) 
    },
    async saveSections({ commit, dispatch, getters }) {
        commit("TRYING_SAVE");
        try {
            let sections = await dashboardService.saveSections({sections: getters.getSections});

            commit("REMOVE_TEMP");
            
            commit("SAVED");

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
    },
    async up({ commit }, payload) {
        commit("UP", payload);
    },
    async down({ commit }, payload) {
        commit("DOWN", payload);
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
    async deleteImage({ commit, dispatch }, image) {
        try {
            await dashboardService.deleteImage({ image });
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            } else {
                const serverError = err.response.data.error;
                commit("SERVER_ERROR", serverError);
            }
        }
    }
};

const mutations = {
    SAVING_PROJECT(state) {
        state.projectSaving += 1;  
    },
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
    INIT_PROJECTS(state, projects) {
        projects.forEach(project => {
            project.images.forEach((image) => {
                image.thumnailUrl = process.env.VUE_APP_API_URL + "/image/" + image.thumbnail;
                image.detailedImageUrl = process.env.VUE_APP_API_URL + "/image/" + image.detailedImage;  
            })
        })
            
        state.projects = projects;
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
                let index = sections.findIndex(s => s.id === section.id)
                sections.splice(index, 1, section);
            }
        });
        
        state.sections = sections;
    },
    ADD_SECTION(state) {
        let randomId = "NEW" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its a unique ID
        while (state.sections.find(section => section.id === randomId) != undefined) {
            randomId = "NEW" + Math.floor(Math.random() * 10000000000); 
        }
        
        let newSection = { id: randomId, status: "NEW", title: ["Sans titre", "Untitled"], metaProjects: [], visible: true};
        state.sections.push(newSection);
    },
    ADD_PROJECT(state, payload) {
        state.projects.push(payload);
    },
    ADD_PROJECT_TO_SECTION(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.sectionId);

        if (state.sections[sectionIndex].metaProjects.find(metaProject => metaProject.project.id === payload.project.id) !== undefined) {
            return
        }
        
        let randomId = "NEW" + Math.floor(Math.random() * 10000000000); 

        let project = state.projects.find(p => p.id == payload.project.id);
        
        let metaProjectIndex = state.sections[sectionIndex].metaProjects == undefined ? 0 : state.sections[sectionIndex].metaProjects.length;

        let metaProject = {id: randomId, index: metaProjectIndex, project: project};

        state.sections[sectionIndex].metaProjects.push(metaProject);
        
        if (state.sections[sectionIndex].status != "NEW")
            state.sections[sectionIndex].status = "UPDATED";
    },
    REMOVE_PROJECT(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.section.id);

       _.remove(state.sections[sectionIndex].metaProjects, metaProject => metaProject.project.id === payload.project.id);
    },
    REMOVE_SECTION(state, payload) {
        let index = state.sections.findIndex(section => section.id === payload.id);

        if (state.sections[index].status == "NEW") {
            _.remove(state.sections, s => s.id === payload.id);
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
        let sectionIndex = state.sections.findIndex(section => section.id === payload.sectionId);
        
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
    UP(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.sectionId);
       
        state.sections[sectionIndex].metaProjects[payload.index].index--;

        state.sections[sectionIndex].metaProjects[payload.index - 1].index++; 

        state.sections[sectionIndex].metaProjects = _.sortBy(state.sections[sectionIndex].metaProjects, ["index"]);

        if (state.sections[sectionIndex].status != "NEW")
            state.sections[sectionIndex].status = "UPDATED";
    },
    DOWN(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.sectionId);
       
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
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};