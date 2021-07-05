const Project = require("../models/project").Project;
const Image = require('../models/image').Image;
const mongoose = require('mongoose');

class ProjectController {
   
    async projects(req, res) {
        try {
            var projects = await Project.find().select("-_id -__v").exec();
           
            res.send(projects);
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

    async updateProject(req, res) {
        try {
            var project = req.body.project
            var updatedProject;
            
            if (project.id.includes("temp")) {
                updatedProject = new Project({ 
                    id : new mongoose.mongo.ObjectId(),
                    title: project.title,
                    description: project.artDescription,
                    artDescription: project.description,
                })
            } else {
                updatedProject = await Project.findOne({ id: project.id }).exec();
                updatedProject.title = project.title;
                updatedProject.description = project.artDescription;
                updatedProject.artDescription = project.description;
            }

            await updatedProject.save();

            res.send(updatedProject.id);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }  
    }
}


module.exports = new ProjectController();