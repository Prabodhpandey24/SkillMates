const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String},
    imageUrl: {type: String, required: true},
    discount: { type: Number, default: 0 }
}, {
    timestamps: true
});

const Course = mongoose.model("Course", coursesSchema);

module.exports = Course;
