import Api from './api.services'

export const dashboardService =  {
	get() {
		return Api().get('/dashboard/');
	},
	saveSections(sections) {
		return Api().post('/dashboard/sections', sections);
	},
	updateIndex(images) {
		return Api().post('/dashboard/updateIndex', images);
	},
}