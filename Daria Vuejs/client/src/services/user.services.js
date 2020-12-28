import Api from "./api.services";

export const userService = {
  login(credentials) {
    return Api().post("login", credentials);
  },
  register(user) {
    return Api().post("register", user);
  }
};
