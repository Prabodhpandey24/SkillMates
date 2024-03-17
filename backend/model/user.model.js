const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: { type: String, unique: true }, 
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

usersSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = shortid.generate(); 
    }
    next();
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
