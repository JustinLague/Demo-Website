const Project = require("../models/project").Project;
const Image = require('../models/image').Image;
const ImageData = require('../models/imageData').ImageData;
const Section = require('../models/section').Section;
const mongoose = require('mongoose');
const fs = require('fs');

class ProjectController {
   
    async projects(req, res) {
        try {
            var projects = await Project.find().select("-_id -__v").exec();
           
            res.send({
              projects
            });
      
          } catch (err) {
              err.status(400).send({ error: err.message });
          }
    }

    async projectId(req, res) {
        try {
          var id = req.params.id;
    
          var project = await Project.findOne({ id: id }).select("-_id -__v").exec();
    
          var images = await Image.find({ projectId: project.id }).select("-_id -__v -data").exec();
         
          res.send({
            project,
            images
          });
    
        } catch (err) {
            err.status(400).send({ error: err.message });
        }
    }

    async createProject(req, res) {
        try {
            var project = new Project({ 
                id : new mongoose.mongo.ObjectId(),
                title: req.body.projectTitle,
                description: req.body.projectDescription,
                artDescription: req.body.projectArtDescription,
            })
            
            await project.save();

            res.send(project.id);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

    async addImage(req, res) {
        var image = new Image({
            id : new mongoose.mongo.ObjectId(),
            projectId : req.body.projectId,
        });

        image.name[0] = req.body.name;
        image.name[1] = req.body.nameEN;

        image.description[0] = req.body.description;
        image.description[1] = req.body.descriptionEN;

        image.artDescription[0] = req.body.artDescription;
        image.artDescription[1] = req.body.artDescriptionEN;

        var thumbnail = new ImageData({
            id : new mongoose.mongo.ObjectId(),
            contentType: req.files[0].mimetype,
            data: new Buffer.from(fs.readFileSync(req.files[0].path), 'base64'),
        });

        var detailedImage = new ImageData({
            id : new mongoose.mongo.ObjectId(),
            contentType: req.files[1].mimetype,
            data: new Buffer.from(fs.readFileSync(req.files[1].path), 'base64'),
        });

        thumbnail.save();
        detailedImage.save();

        image.thumbnail = thumbnail;
        image.detailedImage = detailedImage;

        image.save();
    }
}


module.exports = new ProjectController();