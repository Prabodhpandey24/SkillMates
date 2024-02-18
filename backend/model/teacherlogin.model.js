const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherloginSchema = new Schema({
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
	eduId: {type: Number, require: true},
	courseId: {type: Number, require: true},
    activeClassDash:[
		{
			serialNo: { type: String, required: true },
			dateDay: { type: String, required: true },
			courseName: { type: String, required: true },
			schoolName: { type: String, required: true },
			classDuration: { type: String, required: true },
			activeLink: { type: String, required: true },
			educatorName: { type: String, required: true },
			courseName: { type: String, required: true },
			datetime: { type: String, required: true },
			message: { type: String, required: true },
		}
	]
}, {
    timestamps: true
});


const teacherlogin = mongoose.model("teacherlogin", teacherloginSchema);

module.exports = teacherlogin;

// bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]