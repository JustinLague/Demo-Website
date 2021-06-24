import { dashboardService } from "../../services/dashboard.services";
import { sectionService } from "../../services/section.services";
import router from "../../router";
import _ from 'lodash'; 

/* eslint-disable no-console */
const state = {
    projectTryingToAdd: false,
    sectionTryingToAdd: false,
    projects: [],
    sections: []
};

const getters = {
};

const actions = { 
    async getProjects({ dispatch, commit }) {
        try {
            var projects = await dashboardService.getProjects();
            
            commit("INIT_PROJECTS", projects.data);
        } catch (err) {
            if (err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            } else {
                const serverError = err.response.data.error;
                commit("LOGIN_ERROR", serverError);
            }
        }
    },
    async saveProject({ dispatch, commit }, project) {
        commit("TRYING_ADD_PROJECT");
        try {
            var projectId = await dashboardService.addProject(project.project);
            
            dispatch('saveImage', { images: project.images, projectId: projectId.data });

            commit("ADDED_PROJECT");
            router.push({ name: "Dashboard" });
        } catch (err) {
            if (err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            } else {
                const serverError = err.response.data.error;
                commit("LOGIN_ERROR", serverError);
            }
        }
    },
    async saveImage({ commit, dispatch }, imagePayload) {
        try {
            let formData = new FormData();
            let images = imagePayload.images;

            images.forEach(async image => {
                formData = new FormData();

                formData.append('projectId', imagePayload.projectId)

                formData.append('name', image.title[0]);
                formData.append('nameEN', image.title[1]);
                formData.append('description', image.description[0]);
                formData.append('descriptionEN', image.description[1]);
                formData.append('artDescription', image.artDescription[0]);
                formData.append('artDescriptionEN', image.artDescription[1]);

                formData.append('image', image.dataThumbnail);
                formData.append('image', image.dataImage);

                await dashboardService.addImage(formData);
            })
        } catch (err) {
            if (err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            } else {
                const serverError = err.response.data.error;
                commit("LOGIN_ERROR", serverError);
            }
        }
    },
    async addProject({ commit }, payload) {
        await commit("ADD_PROJECT", payload);
        
        payload = {projectId: payload.project.id, sectionId: payload.sectionId}

        await commit("ADD_PROJECT_TO_SECTION", payload);
    },
    async addSection({ commit }) {
        commit("ADD_SECTION");
    },
    async addProjectToSection({ commit }, payload) {
        commit("ADD_PROJECT_TO_SECTION", payload);
    },
    async initSection({ commit }) {
        const sections = await sectionService.get();
        commit("INIT_SECTION", sections.data);
    },
    async updateSection({ commit }, payload) {
        commit("UPDATE_SECTION", payload);
    },
    async removeProject({ commit }, payload) {
        commit("REMOVE_PROJECT", payload);
    },
    async removeSection({ commit }, section) {
        commit("REMOVE_SECTION", section);
    }
};

const mutations = {
    TRYING_ADD_PROJECT(state) {
        state.projectTryingToAdd = true;
    },
    ADDED_PROJECT(state) {
        state.projectTryingToAdd = false;
    },
    INIT_PROJECTS(state, projects) {
        state.projects = projects.projects;
    },
    INIT_SECTION(state, data) {
        data.forEach(section => {
          section.projects = _.sortBy(section.projects, ["index"]);
        });
    
        state.sections = data;
    },
    ADD_SECTION(state) {
        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its a unique ID
        while (state.sections.find(section => section.id === randomId) != undefined) {
            randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        }
        
        let newSection = { id: randomId, title: ["Sans titre", "Untitled"], projects: []};
        state.sections.push(newSection);
    },
    ADD_PROJECT(state, payload) {
        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its a unique ID
        while (state.sections.find(section => section.id === randomId) != undefined) {
            randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        }
        
        payload.project.id = randomId;
        state.projects.push(payload.project);
    },
    ADD_PROJECT_TO_SECTION(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.sectionId);

        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 

        while (state.sections.projects != undefined && state.sections.projects.find(section => section.projects.id === randomId) != undefined) {
            randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        }
        
        let metaProjectIndex = state.sections.projects == undefined ? 0 : state.sections.projects.length;

        let project = state.projects.find(p => p.id = payload.projectId);

        let metaProject = {id: randomId, index: metaProjectIndex, project: project};

        state.sections[sectionIndex].projects.push(metaProject);
    },
    REMOVE_PROJECT(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.section.id);

       _.remove(state.sections[sectionIndex].projects, subSection => subSection.project.id === payload.project.id);
    },
    REMOVE_SECTION(state, section) {
        _.remove(state.sections, s => s.id === section.id);
    },
    UPDATE_SECTION(state, payload) {
        let prevSectionIndex = state.sections.findIndex(section => section.id === payload.prevSectionID);

        let subSection = _.remove(state.sections[prevSectionIndex].projects, subSection => subSection.project.id === payload.projectID)[0];

        let newSection = state.sections.find(section => section.id === payload.newSectionID);

        newSection.projects.push(subSection);
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};