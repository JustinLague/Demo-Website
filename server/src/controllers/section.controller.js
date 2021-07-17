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
                
                //delete section
                if (section.id.includes("REMOVED")) {
                    let id = section.id.substring(7);
                    Section.findOneAndDelete({ id: id }).exec();
                    continue;
                }

                //create new section
                if (section.id.includes("temp")) {
                    updatedSection = new Section({ 
                        id : new mongoose.mongo.ObjectId(),
                        title: section.title,
                    });
                
                //section already exist
                } else {
                    updatedSection = await Section.findOne({ id: section.id }).populate("projects.project", ["id"]).exec();
                    updatedSection.title = section.title;
                    updatedSection.metaProjects = [];
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

            res.send("Executed correctly");
        } catch (err) {
            res.status(400).send({ error: err.message });
        }  
    }
}

module.exports = new SectionController();