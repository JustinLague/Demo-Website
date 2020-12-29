// Import Controllers
const DariaController = require("./controllers/daria.controller");

module.exports = (app) => {
  //Portfolio
  app.get("/api/porfolio", DariaController.project);

  app.post('/api/uploadFile', DariaController.uploadFile);

  app.post("/api/addImage", DariaController.addImage);

  //Gallery
  //app.get("/api/gallery", DariaController.gallery);
  
  // Project
  //app.get("/api/project/:id", DariaController.portfolio);
};
