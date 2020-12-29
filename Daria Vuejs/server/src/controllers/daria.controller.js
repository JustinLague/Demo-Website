const Image = require('../models/image');
const Project = require("../models/project");
const upload = require("../middleware/upload");

class DariaController {
    
  async project(req, res) {
    try {
      id = req.params.id;

      project = Project.findById(id).exec();

      res.send({
        project
      });

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

 async uploadFile(req, res) {
    try {
      await upload(req, res);
  
      console.log(req.file);
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
  
      return res.send(`File has been uploaded.`);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload image: ${error}`);
    }
  };

  async addImage(req, res) {
    try {

      console.log(req.file);

      var image = new Image();
      image.data = fs.readFileSync(req.files.userPhoto.path)
      image.contentType = 'image/png';
      image.name = req.body.name;
      image.description = req.body.description;
      image.save();
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new DariaController();