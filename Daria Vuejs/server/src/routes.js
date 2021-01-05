// Import Controllers
const PortfolioController = require("./controllers/portfolio.controller");
const DashboardController = require("./controllers/dashboard.controller");
const GalleryController = require("./controllers/gallery.controller"); 
const ProjectController = require("./controllers/project.controller");
const ImageController = require("./controllers/image.controller");
const AuthController = require("./controllers/auth.controller");
const AuthPolicies = require('./middleware/policies/auth')
const upload = require("./middleware/upload")

module.exports = (app) => {
  //Authorisation
  app.post("/api/register", AuthController.register);

  app.post("/api/login", AuthController.login);


  //Portfolio
  app.get("/api/portfolio", PortfolioController.portfolio);
  
  app.post('/api/createPortfolio', upload.single('image'),  PortfolioController.createPortfolio);
  
  
  //Project
  app.post('/api/createProject', upload.array('image', 12),  ProjectController.createProject);

  app.get("/api/project/:id", ProjectController.project);
  

  //Gallery
  app.get("/api/gallery", GalleryController.gallery);
  
  
  //Image
  app.get("/api/image/:id", ImageController.image);

  //Dashboard

  app.get("/api/dashboard", AuthPolicies.verifyToken, DashboardController.dashboard)
};
