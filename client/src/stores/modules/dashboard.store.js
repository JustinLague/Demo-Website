import { dashboardService } from "../../services/dashboard.services";
import { sectionService } from "../../services/section.services";
import { projectService } from "../../services/project.services";
import router from "../../router";
import _ from 'lodash'; 

/* eslint-disable no-console */
const state = {
    serverError: null,
    saving: false,
    projects: [],
    sections: []
};

const getters = {
    getSections(state) {
        return state.sections;
    },
    getProjects(state) {
        return state.projects;
    },
};

const actions = { 
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
    async updateSection({ commit }, payload) {
        commit("UPDATE_SECTION", payload);
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
            await dashboardService.saveSections({sections: getters.getSections});

            commit("REMOVE_TEMP");
            
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
        state.sections.forEach(section => {
            if (section.id.includes("temp"))
                sections.push(section);
        })
        
        sections = sections.map(s => ({
            ...s,
            visible: true
        }));

        state.sections = sections;
    },
    ADD_SECTION(state) {
        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its a unique ID
        while (state.sections.find(section => section.id === randomId) != undefined) {
            randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        }
        
        let newSection = { id: randomId, title: ["Sans titre", "Untitled"], metaProjects: [], visible: true};
        state.sections.push(newSection);
    },
    ADD_PROJECT(state, payload) {
        state.projects.push(payload);
    },
    ADD_PROJECT_TO_SECTION(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.sectionId);

        if (state.sections[sectionIndex].metaProjects.find(metaProject => metaProject.project.id === payload.project.id) !== undefined) 
            return
        
        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 

        let project = state.projects.find(p => p.id == payload.project.id);
        
        let metaProjectIndex = state.sections.metaProjects == undefined ? 0 : state.sections.metaProjects.length;

        let metaProject = {id: randomId, index: metaProjectIndex, project: project};

        state.sections[sectionIndex].metaProjects.push(metaProject);
    },
    REMOVE_PROJECT(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.section.id);

       _.remove(state.sections[sectionIndex].metaProjects, metaProject => metaProject.project.id === payload.project.id);
    },
    REMOVE_SECTION(state, payload) {
        let index = state.sections.findIndex(section => section.id === payload.id);

        if (state.sections[index].id.includes("temp")) {
            console.log("delete");
            _.remove(state.sections, s => s.id === payload.id);
        }
        else {
            state.sections[index].id = "REMOVED" + payload.id;
            state.sections[index].visible = false;
        }

    },
    REMOVE_TEMP(state) {
        state.sections = state.sections.filter(section => {
            return !section.id.includes("temp");
        })
    },
    UPDATE_SECTION(state, payload) {
        let prevSectionIndex = state.sections.findIndex(section => section.id === payload.prevSectionID);

        let metaProject = _.remove(state.sections[prevSectionIndex].projects, metaProject => metaProject.project.id === payload.projectID)[0];

        let newSection = state.sections.find(section => section.id === payload.newSectionID);

        newSection.metaProjects.push(metaProject);
    },
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};