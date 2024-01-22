const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherLoginSchema = new Schema({
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    repassword: { type: String, required: true },
	activeClassDash:[
		{
			serialNo: { type: String, required: true },
			dateDay: { type: String, required: true },
			courseName: { type: String, required: true },
			schoolName: { type: String, required: true },
			classDuration: { type: String, required: true },
			activeLink: { type: String, required: true },
		}
	]
}, {
    timestamps: true
});


const TeacherLogin = mongoose.model("TeacherLogin", usersSchema);

module.exports = TeacherLogin;