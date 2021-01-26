import Api from './api.services'

export const projectService =  {
  get(id) {
    return Api().get('/project/' + id);
  }
}