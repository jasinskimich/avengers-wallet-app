const mongoose = require('mongoose')
const bCrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
})

userSchema.methods.setPassword = function(password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(5))
}

userSchema.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password)
}

const User = mongoose.model("user", userSchema);

module.exports = User