import Api from './api.services'

export const sectionService =  {
  get() {
    return Api().get('/section/');
  }
}