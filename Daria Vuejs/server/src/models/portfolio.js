const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, index: { unique: true }},
    title: [String],
    description: [String],
    projectId: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData"
    },
});

const Portfolio =  mongoose.model("Portfolio", PortfolioSchema)

module.exports = {
    Portfolio,
    PortfolioSchema
}