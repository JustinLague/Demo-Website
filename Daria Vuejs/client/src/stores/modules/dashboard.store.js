import { dashboardService } from "../../services/dashboard.services";

/* eslint-disable no-console */
const state = {
    projectTryingToUpload: false,
};

const getters = {
};

const actions = { 
    async addProject({ dispatch }, project) {
        try {
            var projectId = await dashboardService.addProject(project.project);
            
            dispatch('addImages', {images: project.images, projectId: projectId.data } );
        } catch (err) {
            if (err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            }
        }
    },
    async addImages({ dispatch }, imagePayload) {
        try {
            let formData = new FormData();
            let images = imagePayload.images;

            for(let i = 0; i < imagePayload.images.length; i++) {
                formData.append('projectId', imagePayload.projectId)

                formData.append('name', images[i].title[0]);
                formData.append('nameEN', images[i].title[1]);
                formData.append('description', images[i].description[0]);
                formData.append('descriptionEN', images[i].description[1]);
                formData.append('artDescription', images[i].artDescription[0]);
                formData.append('artDescriptionEN', images[i].artDescription[1]);

                formData.append('image', images[i].dataImage);
                formData.append('image', images[i].dataThumbnail);

                await dashboardService.addImage(formData);
            }
        } catch (err) {
            if (err.response.status === 403) {
                dispatch('user/logout', null, { root: true })
            }
        }
    }
};

const mutations = {
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
