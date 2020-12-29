// Import Controllers
const DariaController = require("./controllers/daria.controller");
const upload = require("./middleware/upload")

module.exports = (app) => {
  //Portfolio
  app.get("/api/porfolio", DariaController.project);

  app.post('/api/uploadImage', upload.single('image'),  DariaController.uploadImage);

  app.post('/api/uploadImages', upload.array('image', 12),  DariaController.uploadImages);

  //Gallery
  //app.get("/api/gallery", DariaController.gallery);
  
  // Project
  //app.get("/api/project/:id", DariaController.portfolio);
};
