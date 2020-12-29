const mongoose = require("mongoose");
const Image  = require("../models/image");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: true, index: { unique: true } },
    artDescription: { type: String },
    description: { type: String },
    images: [Image.ImageSchema]
});

module.exports = mongoose.model("Project", ProjectSchema);
