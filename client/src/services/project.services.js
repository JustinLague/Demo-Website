import Api from './api.services'

export const projectService =  {
  init() {
		return Api().get('/project');
	},
  get(id) {
    return Api().get('/project/' + id);
  }
}