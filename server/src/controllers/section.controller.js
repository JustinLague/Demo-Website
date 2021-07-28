const mongoose = require('mongoose');
const Project = require("../models/project").Project;
const Section = require('../models/section').Section;

class SectionController {

    async section(req, res) {
        try {
            var sections = await Section.find().select("-_id -__v -projects._id").populate("metaProjects.project", ["title", "id"]).exec();

            res.send(sections)
        } catch (err) {
            es.status(400).send({ error: err.message });
        }
    }
    
    async updateSections(req, res) {
        try {
            for (var section of req.body.sections) {

                var updatedSection;
                
                //if section didn't changed
                if (section.status == "SAVED") {
                    continue;
                }
                
                //delete section
                if (section.status == "REMOVED") {
                    Section.findOneAndDelete({ id: section.id }).exec();
                    continue;
                }

                //create new section
                if (section.status == "NEW") {
                    updatedSection = new Section({ 
                        id : new mongoose.mongo.ObjectId(),
                        title: section.title,
                        status: "SAVED"
                    });
                }
                
                //section already exist
                if (section.status == "UPDATED") {
                    updatedSection = await Section.findOne({ id: section.id }).populate("projects.project", ["id"]).exec();
                    updatedSection.title = section.title;
                    updatedSection.metaProjects = [];
                    updatedSection.status = "SAVED";
                } 

                //add project to section
                for (var metaProject of section.metaProjects) {
                    var p = await Project.findOne({ id: metaProject.project.id }).select("id").exec();
                    var newMetaProject = {
                        project: p,
                        index: metaProject.index,
                    }

                    updatedSection.metaProjects.push(newMetaProject);
                }

                await updatedSection.save();
            }

            var sections = await Section.find().select("-_id -__v -projects._id").populate("metaProjects.project", ["title", "id"]).exec();

            res.send(sections)
        } catch (err) {
            res.status(400).send({ error: err.message });
        }  
    }
}

module.exports = new SectionController();