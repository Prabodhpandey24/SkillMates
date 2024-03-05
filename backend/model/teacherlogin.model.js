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
			serialNo: { type: String },
			dateDay: { type: String },
			schoolName: { type: String },
			classDuration: { type: String },
			activeLink: { type: String },
			educatorName: { type: String },
			courseName: { type: String },
			userName: { type: String },
			datetime: { type: String },
			message: { type: String },
		}
	],
	activeschoolClassDash: [
		{
			schoolName: { type: String },
			classDuration: { type: String },
			activeLink: { type: String },
			educatorName: { type: String },
			courseName: { type: String },
			userName: { type: String },
			datetime: { type: String },
			message: { type: String },
		}
	]
}, {
    timestamps: true
});


const teacherlogin = mongoose.model("teacherlogin", teacherloginSchema);

module.exports = teacherlogin;
