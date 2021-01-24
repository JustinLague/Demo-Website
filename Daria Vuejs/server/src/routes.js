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
  
  app.post('/api/dashboard/portfolio', AuthPolicies.verifyToken, upload.single('image'), PortfolioController.createPortfolio);
  
  
  //Project
  app.post('/api/dashboard/image', AuthPolicies.verifyToken, upload.array('image', 2),  ProjectController.addImage);

  app.post('/api/dashboard/project', AuthPolicies.verifyToken, ProjectController.createProject);

  app.get('/api/dashboard/project', ProjectController.getProject);

  app.get("/api/project/:id", ProjectController.project);
  

  //Gallery
  app.get("/api/gallery", GalleryController.gallery);
  
  
  //Image
  app.get("/api/image/:id", ImageController.image);

  
  //Dashboard
};
