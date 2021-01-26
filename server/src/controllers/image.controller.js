const ImageData = require('../models/imageData').ImageData;

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
}

module.exports = new ImageController();