const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    User_Id: {
        type: String,
        required: false,
        default: ''
    },
    cin:{
        type: Number,
        required: true
    },
    first_name: {
        type: String,
        lowercase: true,
    },
    last_name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: { 
        type: String,
        required: true,
        default:'student'
    }
}, { timestamps : { createdAt: 'created_at', updatedAt: 'updated_at' }}); //automatically add while insert or update the object

module.exports = User = mongoose.model('users', UserSchema)