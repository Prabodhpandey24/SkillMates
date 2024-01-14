const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classesSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    path: { type: String, required: true, unique: true },
    classes: [{
        classes_name: { type: String, required: true },
        classes_duration: { type: Number, required: true },
        total_classes: { type: Number, required: true },
        about_classes: { type: String, required: true },
        classes_image: { type: String, required: true },
        classes_instructor: { type: String, required: true }
    }]
}, {
    timestamps: true
});

const Class = mongoose.model("Class", classesSchema);

module.exports = Class;
