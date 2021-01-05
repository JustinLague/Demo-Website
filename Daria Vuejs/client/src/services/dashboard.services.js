import Api from './api.services'

export const dashboardService =  {
  get() {
    return Api().get('/dashboard/');
  }
}