const Project = require("../models/project").Project;
const Portfolio = require("../models/portfolio").Portfolio;
const ImageData = require('../models/imageData').ImageData;
const mongoose = require('mongoose');
const fs = require('fs');

class PortfolioController {
    
    async portfolio(req, res) {
      try {
        var projects = await Project.find().select("-_id -__v -description -artDescription").exec();
       
        res.send({ projects });
  
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    }

    async createPortfolio(req, res) {
        try {

          var image = new ImageData({
            id : new mongoose.mongo.ObjectId(),
            contentType: req.file.mimetype,
            data: new Buffer.from(fs.readFileSync(req.file.path), 'base64'),
          });

          await image.save();

          var portfolio = new Portfolio({ 
            id : new mongoose.mongo.ObjectId(),
            title: [req.body.title, req.body.titleEN],
            description: [req.body.description, req.body.descriptionEN],
            projectId: req.body.projectId,
            image: image
          })
    
          await portfolio.save();
    
          res.send("It has been saved");
    
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
    };
}


module.exports = new PortfolioController();