const Portfolio = require("../models/portfolio").Portfolio;
const ImageData = require('../models/imageData').ImageData;
const mongoose = require('mongoose');
const fs = require('fs');

class PortfolioController {
    
    async portfolio(req, res) {
      try {
        var portfolio = await Portfolio.find().select("-_id -__v -image.data -image.__v -image._id").exec();
       
        res.send({ portfolio });
  
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