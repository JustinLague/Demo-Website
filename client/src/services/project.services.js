import Api from './api.services'

export const projectService =  {
	init() {
		return Api().get('/project');
	},
	get(id) {
	return Api().get('/project/' + id);
	},
	saveProject(project) {
		return Api().post('/dashboard/project', project);
	},
	updateImage(images) {
		return Api().post('/dashboard/images', images, { headers: { 'Content-Type': 'multipart/form-data' }});
	},
	deleteImage(image) {
		return Api().post('/dashboard/deleteImage', image);
	},
}