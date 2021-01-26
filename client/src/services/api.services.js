import axios from "axios";
import store from "../stores/store";

export default () =>
  axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Authorization: `bearer ${store.state.user.token}`
    }
  });
