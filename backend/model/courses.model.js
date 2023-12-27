const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    path: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String},
    imageUrl: {type: String, required: true},
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    educator: { type: String, required: true},
    noclasses: { type: Number, default: 0 }
}, {
    timestamps: true
});

const Course = mongoose.model("Course", coursesSchema);

module.exports = Course;
