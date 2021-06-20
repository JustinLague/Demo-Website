import Api from './api.services'

export const dashboardService =  {
	get() {
		return Api().get('/dashboard/');
	},
	getProjects() {
		return Api().get('/dashboard/project');
	},
	addProject(project) {
		return Api().post('/dashboard/project', project);
	},
	addImage(image) {
		return Api().post('/dashboard/image', image, { headers: { 'Content-Type': 'multipart/form-data' }});
	},
	addSection(section) {
		return Api().post('/dashboard/section', section);
	},
}