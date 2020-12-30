const Portfolio = require("../models/portfolio").Portfolio;
const Image = require('../models/image').Image;
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
          var img = fs.readFileSync(req.file.path);
          var encode_image = img.toString('base64');
          // Define a JSONobject for the image attributes for saving to database
    
          var image = new Image({
            id : new mongoose.mongo.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_image, 'base64'),
          });
    
          await image.save();
    
          image.projectId = req.body.projectId;
    
          var portfolio = new Portfolio({ 
            id : new mongoose.mongo.ObjectId(),
            title: req.body.portfolioTitle,
            description: req.body.portfolioDescription,
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