const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    repassword: { type: String, required: true },
    role: { type: String, required: true },
    activeSessionToken: { type: String, default: null },
}, {
    timestamps: true
});

usersSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, 'JWT_SECRET_KEY');
    return token;
};

const User = mongoose.model("User", usersSchema);

module.exports = User;