import Api from './api.services'

export const aboutService =  {
	init() {
		return Api().get('/about');
	},
	updateAbout(about) {
        return Api().post('/dashboard/about', about, { headers: { 'Content-Type': 'multipart/form-data' }});
	},
}