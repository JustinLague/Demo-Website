import Api from './api.services'

export const sectionService =  {
  init() {
    return Api().get('/section/');
  }
}