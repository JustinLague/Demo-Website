import Api from './api.services'

export const galleryService =  {
  get() {
    return Api().get('/gallery/');
  }
}