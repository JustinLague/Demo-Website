import Api from './api.services'

export const dashboardService =  {
	get() {
		return Api().get('/dashboard/');
	},
	updateProject(project) {
		return Api().post('/dashboard/project', project);
	},
	updateImage(image) {
		return Api().post('/dashboard/image', image, { headers: { 'Content-Type': 'multipart/form-data' }});
	},
	saveSections(sections) {
		return Api().post('/dashboard/sections', sections);
	},
	updateIndex(images) {
		return Api().post('/dashboard/updateIndex', images);
	}
}