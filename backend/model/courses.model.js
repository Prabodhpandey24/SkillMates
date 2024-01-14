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
    educator:[
        {
            educator_name:{type: String, required: true},
            educator_rating:{type: String, required: true},
            about_educator:{type: String, required: true},
            educator_experience:{type: String, required: true},
        }
    ],
    f_and_q:[
        {
            questions:{type: String, required: true},
            answer:{type: String, required: true}
        }
    ]
}, {
    timestamps: true
});

const Course = mongoose.model("Course", coursesSchema);

module.exports = Course;
