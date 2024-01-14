const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    path: { type: String, required: true, unique: true },
	overAllRating:{ type: String, required: true },
    rating: [{
        user_Name: { type: String, required: true },
        total_rating: { type: Number, required: true },
        user_feedback: { type: Number, required: true }
    }]
}, {
    timestamps: true
});

const Rating = mongoose.model("rating", ratingSchema);

module.exports = Rating;
