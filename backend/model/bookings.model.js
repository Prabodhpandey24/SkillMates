const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
    {
        bookings:[
            {
                eduId: { type: Number, required: true },
                courseId: { type: Number, required: true },
                educatorName: { type: String, required: true },
                courseName: { type: String, required: true },
                datetime: { type: Date, required: true },
                message: { type: String, required: true },
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
