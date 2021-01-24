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
	addPortfolio(portfolio) {
		return Api().post('/dashboard/portfolio', portfolio, { headers: { 'Content-Type': 'multipart/form-data' }});
	},
	addImage(image) {
		return Api().post('/dashboard/image', image, { headers: { 'Content-Type': 'multipart/form-data' }});
	}
}