const ImageData = require('../models/imageData').ImageData;
const Image = require('../models/image').Image;
const fs = require('fs');

class ImageController {
    
  async image(req, res) {
    try {
      var id = req.params.id;

      var image = await ImageData.findOne({ _id: id }).select("-__v").exec();

      res.contentType(image.contentType);
      res.send(image.data)

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

    async addImages(req, res) {
        try {
            //find next index 
            var image = await Image.find().sort({index: "desc"}).limit(1).exec();
            var index = 0;
            
            if (image.length > 0) {
                index = ++image[0].index;
            } 

            image = new Image({
                projectId : req.body.projectId,
                index: index
            });

            var thumbnail = new ImageData({
                contentType: req.files[0].mimetype,
                data: new Buffer.from(fs.readFileSync(req.files[0].path), 'base64'),
            });

            var detailedImage = new ImageData({
                contentType: req.files[1].mimetype,
                data: new Buffer.from(fs.readFileSync(req.files[1].path), 'base64'),
            });

            thumbnail.save();
            detailedImage.save();

            image.thumbnail = thumbnail;
            image.detailedImage = detailedImage;

            image.save();

            res.status(200).send();
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

	async updateIndex(req, res) {
		try {
			for (var image of req.body.images) {
				
				var updatedImage = await Image.findOne({ _id: image._id }).exec();

				updatedImage.index = image.index;

				await updatedImage.save();
			}

			res.status(200).send();

		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	}	

	async deleteImage(req, res) {
		try {
			var image = req.body.image;
			
			Image.findOneAndDelete({_id: image._id}).exec();
			
			ImageData.findOneAndDelete({_id: image.thumbnail}).exec();
			ImageData.findOneAndDelete({_id: image.detailedImage}).exec();

			res.status(200).send();
			
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	}
}

module.exports = new ImageController();