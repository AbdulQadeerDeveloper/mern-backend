const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: "./config.env" });

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: function () { return !this.googleId }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: function () { return !this.googleId },
    },
    firstname: {
        type: String,

    },
    lastname: {
        type: String,

    },
    address: {
        type: String,

    },
    city: {
        type: String,

    },
    dob: {
        type: Date,

    },
    cellNumber: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    googleId: {
        type: String,
        default: null
    },
    profileImageUrl: String,
});

// Hashing Password to Secure
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

// Generate Tokens to Verify User
userSchema.methods.generateToken = async function () {
    try {
        let generateToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: generateToken });
        await this.save();
        return generateToken;
    }
    catch (error) {
        console.log(error);
    }
}

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
