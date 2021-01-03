const mongoose = require("mongoose");
const ImageSchema = require('./image').ImageSchema;
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, index: { unique: true }},
    title: [String],
    description: [String],
    image: ImageSchema 
});

const Portfolio =  mongoose.model("Portfolio", PortfolioSchema)

module.exports = {
    Portfolio,
    PortfolioSchema
}