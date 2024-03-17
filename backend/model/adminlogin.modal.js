const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminloginSchema = new Schema({
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});


const adminlogin = mongoose.model("adminlogin", adminloginSchema);

module.exports = adminlogin;
