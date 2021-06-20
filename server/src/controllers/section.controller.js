const mongoose = require('mongoose');
const Project = require("../models/project").Project;
const Section = require('../models/section').Section;

class SectionController {

    async section(req, res) {
        try {
            var sections = await Section.find().select("-_id -__v -projects._id").populate("projects.project", ["title", "id"]).exec();

            res.send(sections)
        } catch (err) {
            es.status(400).send({ error: err.message });
        }
    }

    async updateSections(req, res) {
        try {
            for (var section of req.body.sections) {
                
                var updatedSection;
                
                //create new section
                if (section.id === undefined) {
                    updatedSection = new Section({ 
                        id : new mongoose.mongo.ObjectId(),
                        title: section.title,
                    });
                
                //section already exist
                } else {
                    updatedSection = await Section.findOne({ id: section.id }).populate("projects.project", ["id"]).exec();
                    updatedSection.title = section.title;
                    updatedSection.projects = [];
                }

                //add project to section
                for (var project of section.projects) {
                    var p = await Project.findOne({ id: project.id }).select("id").exec();
                    var newProject = {
                        project: p,
                        index: project.index,
                    }

                    updatedSection.projects.push(newProject);
                }

                await updatedSection.save();
            }

            res.send("Executed correctly");
        } catch (err) {
            res.status(400).send({ error: err.message });
        }  
    }
}

module.exports = new SectionController();