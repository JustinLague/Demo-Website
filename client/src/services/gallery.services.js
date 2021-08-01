import Api from './api.services'

export const galleryService =  {
  init() {
    return Api().get('/gallery/');
  }
}