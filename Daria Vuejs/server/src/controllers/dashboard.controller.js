const Image = require('../models/image').Image;

class ImageController {
    
  async dashboard(req, res) {
    try {
      var image = await Image.find().select("-_id -__v").exec();

      res.send({
          nbImages : image.length
      })

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new ImageController();