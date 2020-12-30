const Project = require("../models/project").Project;
const Image = require('../models/image').Image;
const mongoose = require('mongoose');
const fs = require('fs');

class ProjectController {
   
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
}


module.exports = new ProjectController();