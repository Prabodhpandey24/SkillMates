const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teachersSchema = new Schema(
    {
        id: { type: Number, unique: true },
        teacher_deatils: [
            {
                fullname: { type: String, required: true },
                email: { type: String, required: true },
                mobile: { type: Number, required: true },
                dob: { type: String, required: true },
                address: { type: String, required: true },
                pincode: { type: Number, required: true },
                wpl: { type: String, required: true },
                experience: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);


const Teacher = mongoose.model("Teacher", teachersSchema);

module.exports = Teacher;
