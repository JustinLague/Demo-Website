import { projectService } from "../../services/project.services";
import router from "../../router";

/* eslint-disable no-console */
const state = {
	serverError: null,
	saving: false,
	projects: [], 
	project: {},
};

const getters = {
  getProjects(state) {
    return state.projects;
  },
  getProject: (state) => (id) => {
    return state.projects.find(project => project._id === id);
  }
};

const actions = { 
  async initProject({ commit }, id) {
    try {
      const project = await projectService.get(id);
      commit("INIT_PROJECT", project.data);
    } catch (err) {
      console.error(err)
      const serverError = err.response.data.error;
      commit("LOGIN_ERROR", serverError);
    }
  },

  //ADMIN
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
	async createProject({ commit}, payload) {
		commit("CREATE_PROJECT", payload);
	},
	async saveProject({ commit, dispatch}, project) {
		try {
			var oldId = project._id;
			var projectId = await projectService.saveProject({project: project});

			commit("UPDATE_PROJECT_ID", {oldId: oldId, newId: projectId.data});
			
			dispatch("dashboard/updateProjectId", {oldId: oldId, newId: projectId.data}, { root: true });

			await dispatch("updateImage", { images: project.images, projectId: projectId.data });
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
					
					await projectService.updateImage(formData);
				}
			}));
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
	async deleteImage({ commit, dispatch }, payload) {
        try {
            await projectService.deleteImage({ image: payload.image });

            commit("REMOVE_IMAGE_FROM_PROJECT", payload)
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
	async addImage({ commit }, payload) {
        commit("ADD_IMAGE_PROJECT", payload);
    },
	async updateValue({commit}, payload) {
		commit("UPDATE_VALUE", payload);		
	}
};

const mutations = {
	INIT_PROJECT(state, data) {
		state.project.title = data.project.title;
		state.project.description = data.project.description;
		state.project.artDescription = data.project.artDescription;
		state.project.images = data.images;

		state.project.images.forEach((image) => {
			image.thumnailUrl = process.env.VUE_APP_API_URL + "/image/" + image.thumbnail;
			image.detailedImageUrl = process.env.VUE_APP_API_URL + "/image/" + image.detailedImage;  
		})
	},

	//ADMIN
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
		state.projects.forEach(project => {
			project.images.forEach((image) => {
				image.thumnailUrl = process.env.VUE_APP_API_URL + "/image/" + image.thumbnail;
				image.detailedImageUrl = process.env.VUE_APP_API_URL + "/image/" + image.detailedImage;  
			})

            if (project.status == "NEW")
				projects.push(project);
            
            if (project.status == "UPDATED") {
                let index = projects.findIndex(s => s._id === project._id)
                projects.splice(index, 1, project);
            }
        });

        state.projects = projects;
	},
	CREATE_PROJECT(state, payload) {
		let randomId = "NEW" + Math.floor(Math.random() * 10000000000); 
        
        //making sure its a unique ID
        while (state.projects.find(project => project._id === randomId) != undefined) {
            randomId = "NEW" + Math.floor(Math.random() * 10000000000); 
        }

        let newProject = { _id: randomId, status: "NEW", title: ["Sans titre", "No title"], artDescription: ["description de l'art", "art description"], description: ["description du project", "project description"], images: []};

        state.projects.push(newProject);
		
		router.push({name: 'AdminProject', params: { sectionId: payload.sectionId, projectId: randomId }});
	},
	REMOVE_TEMP(state) {
        state.projects = state.projects.filter(project => {
            return project.status !== "NEW" && project.status !== "UPDATED";
        });
    },
	REMOVE_IMAGE_FROM_PROJECT(state, payload) {
        var index = state.projects.findIndex(project => project._id === payload.projectId);
        state.projects[index].images = state.projects[index].images.filter(image => image._id !== payload.image._id);

		if(state.projects[index].status != "NEW")
			state.projects[index].status = "UPDATED";
    },
    ADD_IMAGE_PROJECT(state, payload) {
        var index = state.projects.findIndex(project => project._id === payload.projectId);
        state.projects[index].images.push(payload.image);

		if(state.projects[index].status != "NEW")
			state.projects[index].status = "UPDATED";
    },
	UPDATE_VALUE(state, payload) {
		var index = state.projects.findIndex(project => project._id === payload.projectId);
        
		switch(payload.lang) {
			case("fr"):
				state.projects[index][payload.prop][0] = payload.value;
				break;
			case("en"):
				state.projects[index][payload.prop][1] = payload.value;
				break;
		}

		if(state.projects[index].status != "NEW")
			state.projects[index].status = "UPDATED";
	},
	UPDATE_PROJECT_ID(state, payload) {
		var index = state.projects.findIndex(project => project._id === payload.oldId);

		state.projects[index]._id = payload.newId;
		state.projects[index].status = "SAVED";
	}
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
