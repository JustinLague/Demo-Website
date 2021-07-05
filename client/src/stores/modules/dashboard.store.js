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
            console.log(projects);
            //commit("INIT_PROJECTS", projects.data);
        } catch (err) {
            if (err.response.status === 403) {
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

            commit("INIT_SECTION", sections.data);
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

        router.push({ name: "AdminPortfolio" });
    },
    async updateProject({ dispatch, commit }, project) {
        try {
            var projectId = await dashboardService.updateProject({project});
            
            commit("UPDATE_PROJECT_ID", { prevProjectId: project.id, newProjectId: projectId.data });
            
            await dispatch("updateImage", { images: project.images, projectId: projectId.data });
        } catch (err) {
            console.log(err);
            if (err.response.status === 403) {
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

            images.forEach(async image => {
                formData = new FormData();

                formData.append('projectId', imagePayload.projectId)

                formData.append('image', image.dataThumbnail);
                formData.append('image', image.dataImage);

                await dashboardService.updateImage(formData);
            })
        } catch (err) {
            console.log(err);
            if (err.response.status === 403) {
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
    async removeSection({ commit }, section) {
        commit("REMOVE_SECTION", section);
    },
    async saveProjects({dispatch, getters}) {
        getters.getProjects.forEach(project => {
           dispatch("updateProject", project);
        }) 
        console.log("fin save Project");
    },
    async saveSections({ commit, dispatch, getters }) {
        commit("TRYING_SAVE");
        try {
            console.log("save section");

            await dashboardService.saveSections({sections: getters.getSections});

            commit("SAVED");
        } catch (err) {
            console.log(err);
            if (err.response.status === 403) {
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
            if (state.projects.find(p => p.id == project.id) === undefined) {
                state.projects.push(project);    
            }
        });
    },
    INIT_SECTION(state, data) {
        data.forEach(section => {
            section.metaProjects = _.sortBy(section.metaProjects, ["index"]);

            if(state.sections.find(stateSection => stateSection.id === section.id ) == undefined) {
                state.sections.push(section);
            }
        });
    },
    ADD_SECTION(state) {
        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its a unique ID
        while (state.sections.find(section => section.id === randomId) != undefined) {
            randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        }
        
        let newSection = { id: randomId, title: ["Sans titre", "Untitled"], metaProjects: []};
        state.sections.push(newSection);
    },
    ADD_PROJECT(state, payload) {
        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its an unique ID
        while (state.projects.find(project => project.id === randomId) != undefined) {
            randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        }
        
        payload.project.id = randomId;
        state.projects.push(payload.project);
    },
    ADD_PROJECT_TO_SECTION(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.sectionId);

        let randomId = "tempId" + Math.floor(Math.random() * 10000000000); 
        
        //test qu'il n'y a pas de doublons 

        let metaProjectIndex = state.sections.metaProjects == undefined ? 0 : state.sections.metaProjects.length;

        let project = state.projects.find(p => p.id == payload.projectId);

        let metaProject = {id: randomId, index: metaProjectIndex, project: project};

        state.sections[sectionIndex].metaProjects.push(metaProject);
    },
    REMOVE_PROJECT(state, payload) {
        let sectionIndex = state.sections.findIndex(section => section.id === payload.section.id);

       _.remove(state.sections[sectionIndex].projects, metaProject => metaProject.project.id === payload.project.id);
    },
    REMOVE_SECTION(state, section) {
        _.remove(state.sections, s => s.id === section.id);
    },
    UPDATE_SECTION(state, payload) {
        let prevSectionIndex = state.sections.findIndex(section => section.id === payload.prevSectionID);

        let metaProject = _.remove(state.sections[prevSectionIndex].projects, metaProject => metaProject.project.id === payload.projectID)[0];

        let newSection = state.sections.find(section => section.id === payload.newSectionID);

        newSection.metaProjects.push(metaProject);
    },
    UPDATE_PROJECT_ID(state, payload) {
        let projectIndex = state.projects.findIndex(project => project.id === payload.prevProjectId);
        
        state.projects[projectIndex].id = payload.newProjectId;
    }   
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};