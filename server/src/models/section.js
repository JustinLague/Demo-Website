const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, index: { unique: true }},
    title: [String],
    metaProjects: [{
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
        index: Number
    }]
});

const Section = mongoose.model("Section", SectionSchema)

module.exports = {
    Section,
    SectionSchema
}