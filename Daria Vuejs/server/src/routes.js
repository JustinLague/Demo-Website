// Import Controllers
const DariaController = require("./controllers/daria.controller");
const upload = require("./middleware/upload")

module.exports = (app) => {
  //Portfolio
  app.get("/api/portfolio", DariaController.portfolio);

  app.post('/api/createProject', upload.array('image', 12),  DariaController.createProject);

  app.post('/api/createPortfolio', upload.single('image'),  DariaController.createPortfolio);

  //Gallery
  //app.get("/api/gallery", DariaController.gallery);
  
  //Project
  app.get("/api/project/:id", DariaController.project);
  
  app.get("/api/image/:id", DariaController.image);
  
};
