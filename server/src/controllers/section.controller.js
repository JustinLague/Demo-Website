const mongoose = require('mongoose');
const Project = require("../models/project").Project;
const Section = require('../models/section').Section;

class SectionController {

    async section(req, res) {
        try {
            var sections = await Section.find().select("-_id -__v -id").populate("projects", ["title", "id"]).exec();

            res.send(sections)
        } catch (err) {
            es.status(400).send({ error: err.message });
        }
    }

    async createSection(req, res) {
        try {
            var section = new Section({ 
                id : new mongoose.mongo.ObjectId(),
                title: req.body.title,
            })
            
            for (var id of req.body.projectsId) {
                var project = await Project.findOne({ id: id }).exec();
                section.projects.push(project);
            }

            await section.save();

            res.send(section);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }   
    }
}

module.exports = new SectionController();