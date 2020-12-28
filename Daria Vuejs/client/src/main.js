import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPalette, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BootstrapVue } from "bootstrap-vue";

Vue.use(BootstrapVue);
library.add(faPalette);
library.add(faEraser);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");
