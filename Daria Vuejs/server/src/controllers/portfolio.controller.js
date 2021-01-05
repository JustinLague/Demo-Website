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
            contentType: req.file.mimetype,
            data: new Buffer.from(encode_image, 'base64'),
          });

          //there is a better way to do this i know.

          image.name[0] = req.body.name;
          image.name[1] = req.body.nameEN;

          image.description[0] = req.body.description;
          image.description[1] = req.body.descriptionEN;

          image.artDescription[0] = req.body.artDescription;
          image.artDescription[1] = req.body.artDescriptionEN;

          await image.save();
    
          image.projectId = req.body.projectId;
    
          var portfolio = new Portfolio({ 
            id : new mongoose.mongo.ObjectId(),
            description: req.body.portfolioDescription,
            image: image
          })

          portfolio.title[0] = req.body.portfolioTitle;
          portfolio.title[1] = req.body.portfolioTitleEN;

          portfolio.description[0] = req.body.description;
          portfolio.description[1] = req.body.descriptionEN;
    
          await portfolio.save();
    
          res.send("It has been saved");
    
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
    };
}


module.exports = new PortfolioController();