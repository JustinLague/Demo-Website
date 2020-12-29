const Image = require('../models/image');
const Project = require("../models/project");
const fs = require('fs');

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

  async uploadImage(req, res) {
    try {
      var img = fs.readFileSync(req.file.path);
      var encode_image = img.toString('base64');
      // Define a JSONobject for the image attributes for saving to database
    
      var image = new Image.Image({
          name: req.body.name,
          description: req.body.description,
          contentType: req.file.mimetype,
          data: new Buffer.from(encode_image, 'base64') 
        });

      image.save();

      res.send("It has been saved");
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  };

  async uploadImages(req, res) {
    try {
      req.files.forEach((file, index) => {
        var img = fs.readFileSync(file.path);
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database
      
        var image = new Image.Image({
            id: index,
            name: req.body.name + index,
            description: req.body.description,
            contentType: file.mimetype,
            data: new Buffer.from(encode_image, 'base64') 
          });
  
        image.save();
      })

      res.send("It has been saved");
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  };
}

module.exports = new DariaController();