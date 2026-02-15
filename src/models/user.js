const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 30,
        trim: true,
    },
    emailID: {
        type: String,
        rrequired: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    age: {
        type: Number,
        min: 18,
    },
    profileImage: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    skills: {
        type: [String],
    }
});

module.exports = mongoose.model("User", userSchema);