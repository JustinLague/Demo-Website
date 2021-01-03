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
          })
    
          project.title[0] = req.body.projectTitle;
          project.title[1] = req.body.projectTitleEN;

          project.description[0] = req.body.projectDescription;
          project.description[1] = req.body.projectDescriptionEN;

          project.artDescription[0] = req.body.projectArtDescription;
          project.artDescription[1] = req.body.projectArtDescriptionEN;
          
          await project.save();
    
          req.files.forEach((file) => {
            var img = fs.readFileSync(file.path);
          
            var image = new Image({
                id : new mongoose.mongo.ObjectId(),
                contentType: file.mimetype,
                data: new Buffer.from(img, 'base64'),
                projectId: project.id
            });


            image.name[0] = req.body.name;
            image.name[1] = req.body.nameEN;

            console.log("name")

            image.description[0] = req.body.description;
            image.description[1] = req.body.descriptionEN;

            console.log("description")

            image.artDescription[0] = req.body.artDescription;
            image.artDescription[1] = req.body.artDescriptionEN;

            console.log("artdescription")
      
            image.save();
          })
    
          res.send("It has been saved");
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
    };
}


module.exports = new ProjectController();