import Api from './api.services'

export const dashboardService =  {
	get() {
		return Api().get('/dashboard/');
	},
	addProject(project) {
		return Api().post('/dashboard/project', project);
	},
	addImage(image) {
		return Api().post('/dashboard/image', image, { headers: { 'Content-Type': 'multipart/form-data' }});
	}
}