const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, index: { unique: true }},
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData"
    },
    detailedImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData"
    },
    index: Number
});

const Image =  mongoose.model("Image", ImageSchema)

module.exports = {
    Image,
    ImageSchema
}