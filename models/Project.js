const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    Project_Id: {
        type: String,
        required: false,
        default: ''
    },
    
    titre: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    nb_tache: {
        type: Number,
        required: true
    },
    estimatedTime: {
        type: Number,
        required: true
    },
    globalTime : {
        type:Number ,
        required : true
    }
}, { timestamps : { createdAt: 'created_at'}});

module.exports = Project = mongoose.model('Project', ProjectSchema)
