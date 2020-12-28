import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue } from "bootstrap-vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");
