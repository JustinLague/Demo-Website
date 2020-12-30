const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, index: { unique: true }},
    name: { type: String },
    description: { type: String },
    data: { type: Buffer },
    contentType: { type: String },
    projectId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});

const Image =  mongoose.model("Image", ImageSchema)

module.exports = {
    Image,
    ImageSchema
}