// Import Controllers
const AuthController = require("./controllers/auth.controller");

//Import Policies
const AuthPolicies = require("./policies/auth");

module.exports = (app) => {
  // Auth
  app.post("/api/register", AuthController.register);
  app.post("/api/login", AuthController.login);

  //Test
  //app.get("api/helloWorld", AuthPolicies.verifyToken, HelloWorld.helloWorld);
};
