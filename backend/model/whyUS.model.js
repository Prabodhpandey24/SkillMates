const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const whyUsSchema = new Schema({
	imageUrl: {type: String, required: true},
    heading: {type: String, required: true},
	description: { type: String},
}, {
    timestamps: true
});

const WhyUs = mongoose.model("WhyUs", whyUsSchema);

module.exports = WhyUs;
