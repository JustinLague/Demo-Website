const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    id: { type: Number, index: { unique: true }},
    name: { type: String },
    description: { type: String },
    data: { type: Buffer },
    contentType: { type: String }
});

const Image =  mongoose.model("Image", ImageSchema)

module.exports = {
    ImageSchema: ImageSchema,
    Image: Image
}