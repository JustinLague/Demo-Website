const ImageData = require('../models/imageData').ImageData;
const Image = require('../models/image').Image;
const mongoose = require('mongoose');
const fs = require('fs');

class ImageController {
    
  async image(req, res) {
    try {
      var id = req.params.id;

      var image = await ImageData.findOne({ _id: id }).select("-_id -__v").exec();

      res.contentType(image.contentType);
      res.send(image.data)

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async addImage(req, res) {
    try {
        var image = new Image({
            id : new mongoose.mongo.ObjectId(),
            projectId : req.body.projectId,
        });

        var thumbnail = new ImageData({
            id : new mongoose.mongo.ObjectId(),
            contentType: req.files[0].mimetype,
            data: new Buffer.from(fs.readFileSync(req.files[0].path), 'base64'),
        });

        var detailedImage = new ImageData({
            id : new mongoose.mongo.ObjectId(),
            contentType: req.files[1].mimetype,
            data: new Buffer.from(fs.readFileSync(req.files[1].path), 'base64'),
        });

        thumbnail.save();
        detailedImage.save();

        image.thumbnail = thumbnail;
        image.detailedImage = detailedImage;

        image.save();
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
}

module.exports = new ImageController();