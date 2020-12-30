const Image = require('../models/image').Image;

class ImageController {
    
  async image(req, res) {
    try {
      var id = req.params.id;

      var image = await Image.findOne({ id: id }).select("-_id -__v").exec();

      res.contentType(image.contentType);
      res.send(image.data)

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new ImageController();