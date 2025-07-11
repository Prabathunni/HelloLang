const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "Hello, I am using HelloLang!",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    languagesSpoken: {
        type: [String],
        default: ['English'],
        required: true
    }
    ,
    languagesToLearn: {
        type: [String],       
        default: [],                  
    }, 
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    soketId: {
        type: String,
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
