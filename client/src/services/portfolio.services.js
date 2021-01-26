import Api from './api.services'

export const portfolioService =  {
  get() {
    return Api().get('/portfolio/');
  }
}