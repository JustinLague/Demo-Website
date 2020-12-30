const Image = require('../models/image').Image;
const Project = require("../models/project").Project;
const Portfolio = require("../models/portfolio").Portfolio;
const mongoose = require('mongoose');
const fs = require('fs');

class DariaController {
    
  async portfolio(req, res) {
    try {
      var portfolio = await Portfolio.find().select("-_id -__v -image.data -image.__v -image._id").exec();
     
      res.send({ portfolio });

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }


  async project(req, res) {
    try {
      var id = req.params.id;

      var project = await Project.findOne({ id: id }).select("-_id -__v").exec();

      var images = await Image.find({ projectId: project.id }).select("-_id -__v -data").exec();
     
      res.send({
        project,
        images
      });

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async createProject(req, res) {
    try {
      var project = new Project({ 
        id : new mongoose.mongo.ObjectId(),
        title: req.body.projectTitle,
        description: req.body.projectDescription,
        artDescription: req.body.projectArtDescription
      })

      await project.save();

      req.files.forEach((file) => {
        var img = fs.readFileSync(file.path);
      
        var image = new Image({
            id : new mongoose.mongo.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            contentType: file.mimetype,
            data: new Buffer.from(img, 'base64'),
            projectId: project.id
          });
  
        image.save();
      })

      res.send("It has been saved");
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  };

  async createPortfolio(req, res) {
    try {
      var img = fs.readFileSync(req.file.path);
      var encode_image = img.toString('base64');
      // Define a JSONobject for the image attributes for saving to database

      var image = new Image({
        id : new mongoose.mongo.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        contentType: req.file.mimetype,
        data: new Buffer.from(encode_image, 'base64'),
      });

      await image.save();

      image.projectId = req.body.projectId;

      var portfolio = new Portfolio({ 
        id : new mongoose.mongo.ObjectId(),
        title: req.body.portfolioTitle,
        description: req.body.portfolioDescription,
        image: image
      })

      await portfolio.save();

      res.send("It has been saved");

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  };

  async image(req, res) {
    try {
      var id = req.params.id;

      var image = await Image.findOne({ id: id }).select("-_id -__v").exec();

      res.contentType(image.contentType);
      res.send(image.data)

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new DariaController();