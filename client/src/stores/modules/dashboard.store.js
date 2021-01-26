import { dashboardService } from "../../services/dashboard.services";
import router from "../../router";

/* eslint-disable no-console */
const state = {
    projectTryingToAdd: false,
    portfolioTryingToAdd: false,
    projects: []
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
            }
        }
    },
    async addProject({ dispatch, commit }, project) {
        commit("TRYING_ADD_PROJECT");
        try {

            var projectId = await dashboardService.addProject(project.project);
            
            dispatch('addImage', {images: project.images, projectId: projectId.data });

            commit("ADDED_PROJECT");
            router.push({ name: "Dashboard" });
        } catch (err) {
            if (err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            }
        }
    },
    async addPortfolio({ dispatch, commit }, portfolio) {
        commit("TRYING_ADD_PORTFOLIO");
        try {
            let formData = new FormData();
            
            formData.append('title', portfolio.portfolioTitle[0]);
            formData.append('titleEN', portfolio.portfolioTitle[1]);
            formData.append('description', portfolio.portfolioDescription[0]);
            formData.append('descriptionEN', portfolio.portfolioDescription[1]);
            formData.append('projectId', portfolio.projectId);
            
            formData.append('image', portfolio.image.dataImage);
            
            await dashboardService.addPortfolio(formData);
            
            commit("ADDED_PORTFOLIO");
            router.push({ name: "Dashboard" });
        } catch (err) {
            if (err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            }
        }
    },
    async addImage({ dispatch }, imagePayload) {
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
            }
        }
    }
};

const mutations = {
    TRYING_ADD_PROJECT(state) {
        state.projectTryingToAdd = true;
    },
    ADDED_PROJECT(state) {
        state.projectTryingToAdd = false;
    },
    TRYING_ADD_PORTFOLIO(state) {
        state.portfolioTryingToAdd = true;
    },
    ADDED_PORTFOLIO(state) {
        state.portfolioTryingToAdd = false;
    },
    INIT_PROJECTS(state, projects) {
        state.projects = projects.project;
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
