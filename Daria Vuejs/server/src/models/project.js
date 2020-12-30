const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, index: { unique: true }},
    title: { type: String, required: true},
    artDescription: { type: String },
    description: { type: String },
});


const Project =  mongoose.model("Project", ProjectSchema)

module.exports = {
    Project,
    ProjectSchema
}